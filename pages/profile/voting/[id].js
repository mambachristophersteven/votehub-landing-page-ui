import styles from "../../../styles/Dashboard.module.scss";
import React, { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../../functions";
import { UserContext } from "../../../context";
import {
  Button,
  CircleArrowRightIcon,
  Dialog,
  EditIcon,
  FileCard,
  FileUploader,
  Menu,
  Pane,
  PeopleIcon,
  Popover,
  Position,
  PowerIcon,
  TextInputField,
  TimelineBarChartIcon,
  TrashIcon,
  toaster,
} from "evergreen-ui";
import DashboardLayout from "../../../components/DashboardLayout";
import Link from "next/link";

import { useRouter } from "next/router";
import Transactions from "../../../components/Transactions";
import { BASE_URL } from "../../../config/api";

export default function PollID({ data }) {
  const [events, setevents] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);
  const router = useRouter();
  const [bank, setbank] = useState("");
  const [name, setname] = useState("");
  const [account, setaccount] = useState("");
  const [comment, setcomment] = useState("");
  const [loading, setloading] = useState(false);

  const [isShown, setIsShown] = useState(false);
  const [isShownWithdraw, setisShownWithdraw] = useState(false);
  const [addmode, setaddmode] = useState(0);
  const [csv, setcsv] = useState(false);

  const [files, setFiles] = React.useState([]);
  const [fileRejections, setFileRejections] = React.useState([]);
  const handleChange = React.useCallback((files) => setFiles([files[0]]), []);
  const handleRejected = React.useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = React.useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);

  console.log(data);
  let poll = data ? data?.poll : {};

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes);

    if (userContext) {
      let response = await func.getNomineesBy({
        id: poll?.id,
      });
      console.log(response);
      if (response.status) {
        setevents(response.nominees ? response.nominees : []);
      } else {
        toaster.danger("Something went wrong, Please try again");
      }
    }

    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, [poll]);

  const handleWithdraw = async () => {
    if (loading) {
      return;
    }
    if (!name && !bank && !account) {
      toaster.danger("Enter your details");
      return;
    }
    setloading(true);
    // commit
    let response = await func.voteWithdraw({
      bank: bank,
      name: name,
      accountnumber: account,
      comment: comment,
      user: userContext,
      status: false,
      id: poll?.id,
      timestamp: String(Date.now()),
      amount: Number(poll?.balance - poll?.balance * 0.1).toFixed(2),
      poll: poll,
    });
    // console.log(response);
    if (response.status) {
      toaster.success("Withdrawal request sent successfully.");
      setisShownWithdraw(false);
      setloading(false);
    } else {
      toaster.danger("Something went wrong, Please try again");
      setloading(false);
    }
  };

  return (
    <DashboardLayout sidebar={false}>
      <main className={styles.main}>
        <div className={styles.top}>
          <div onClick={() => router.back()}>
            <img alt="citsa vote" src="/back.png" />
          </div>
        </div>
        <div className={styles.top2}>
          <text className={styles.toptxt12}>{poll?.name}</text>
          <text className={styles.toptxt2}>{poll?.about}</text>
        </div>

        <div className={styles.hlist}>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="/poll.png" />
              <text className={styles.hlistitemtext}>Revenue</text>
            </div>
            <text className={styles.hlistitemtext1}>
              GHS{" "}
              {Number(poll?.totalVotes).toFixed(2) *
                Number(poll?.costPerVote).toFixed(2)}
            </text>
          </div>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="/badge.png" />
              <text className={styles.hlistitemtext}>Total Votes</text>
            </div>
            <text className={styles.hlistitemtext1}>{poll?.totalVotes}</text>
          </div>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="/users.png" />
              <text className={styles.hlistitemtext}>Nominees</text>
            </div>
            <text className={styles.hlistitemtext1}>{events?.length}</text>
          </div>
        </div>

        {events?.length > 0 ? (
          <div className={styles.sales}>
            <div className={styles.graph}>
              <text>Your Nominees</text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => setIsShown(true)}
                  className={styles.infobtn}
                  style={{
                    marginRight: 10,
                  }}
                >
                  Add Nominee
                </div>
                <Popover
                  content={
                    <Menu>
                      <Menu.Group>
                        <Menu.Item
                          icon={TimelineBarChartIcon}
                          secondaryText={poll?.showresults ? "On" : "Off"}
                          onClick={async () => {
                            let response = await func.showResults(poll);
                            console.log(response);
                            if (response.status) {
                              location.reload();
                            } else {
                              toaster.danger(
                                "Something went wrong, Please try again"
                              );
                            }
                          }}
                        >
                          {poll?.showresults
                            ? " Hide Results"
                            : " Show Results"}
                        </Menu.Item>
                        <Menu.Item disabled icon={EditIcon}>
                          Edit
                        </Menu.Item>
                      </Menu.Group>
                      <Menu.Divider />
                      <Menu.Group>
                        <Menu.Item
                          icon={PowerIcon}
                          intent={poll?.avaliable ? "danger" : "success"}
                          onClick={async () => {
                            let response = await func.stopEvent(poll);
                            console.log(response);
                            if (response.status) {
                              location.reload();
                            } else {
                              toaster.danger(
                                "Something went wrong, Please try again"
                              );
                            }
                          }}
                        >
                          {poll?.avaliable ? " Stop Event" : " Resume Event"}
                        </Menu.Item>
                        <Menu.Item disabled icon={TrashIcon} intent="danger">
                          Delete...
                        </Menu.Item>
                      </Menu.Group>
                    </Menu>
                  }
                  position={Position.BOTTOM_RIGHT}
                >
                  <div
                    onClick={() => setIsShown(true)}
                    className={styles.infobtn}
                  >
                    <img src="/menud.png" className={styles.menud} />
                  </div>
                </Popover>
              </div>
            </div>
            <div className={styles.table}>
              <text className={styles.one}>Nominee</text>
              <text className={styles.two}>Category</text>
              <text className={styles.three}>Votes</text>
              <text className={styles.four}>Share Code</text>
            </div>

            {events
              .sort((a, b) => b.votes - a.votes)
              .map((item, index) => {
                return (
                  <div className={styles.tableitems}>
                    <div className={styles.one}>
                      <img
                        alt="citsa vote"
                        src={item?.imageURL ? item?.imageURL : "/photo.png"}
                      />
                      <div className={styles.oneitem}>
                        <text className={styles.eventname}>{item?.name}</text>
                        <text className={styles.eventdate}></text>
                      </div>
                    </div>
                    <div className={styles.two}>
                      <text className={styles.eventname}>{item?.category}</text>
                    </div>
                    <div className={styles.three}>
                      <text className={styles.eventsold}>{item?.votes}</text>
                    </div>
                    <div className={styles.four}>
                      <Link href={`/vote/${item?.code}`}>
                        <div onClick={() => {}} className={styles.fouritem}>
                          {item?.code}
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={styles.sales}>
            {/* No events, create a new event */}
            <div className={styles.info}>
              <img alt="citsa vote" src="/user.png" />
              <text className={styles.infotxt}>
                You have no nominees, create a new nominee
              </text>

              <div onClick={() => setIsShown(true)} className={styles.infobtn}>
                Add nominee
              </div>
            </div>
          </div>
        )}
      </main>

      <section className={styles.rightbar}>
        <div className={styles.searchcon}>
          <input placeholder="Search for your events" />
          <img alt="citsa vote" src="/loupe.png" />
        </div>

        <div className={styles.card}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <text className={styles.cardtitle}>Withdrawable Balance</text>
            <text className={styles.balance}>
              GHS{" "}
              {Number(
                poll?.balance - poll?.balance * (Number(poll?.percentage) / 100)
              ).toFixed(2)}
            </text>
            <text className={styles.cardtitle2}>
              Actual Bal: GHS {Number(poll?.balance).toFixed(2)}
            </text>
          </div>

          <div
            onClick={() => setisShownWithdraw(true)}
            className={styles.withdraw}
          >
            Withdraw
          </div>
        </div>

        <Transactions poll={poll} />
      </section>

      <Dialog
        isShown={isShown}
        onCloseComplete={() => {
          setaddmode(0);
          setcsv(false);
          setIsShown(false);
        }}
        hasFooter={false}
        hasHeader={false}
        width="60%"
      >
        {csv ? (
          <div className={styles.dialogcon}>
            <text className={styles.dialogtext}>Upload CSV</text>
            <text className={styles.dialogtext2}>
              How to do want to add your nominees?
            </text>
            <FileUploader
              className={styles.file}
              label=""
              hint="You can upload 1 CSV file. File can be up to 10 MB."
              maxSizeInBytes={10 * 1024 ** 2}
              maxFiles={1}
              onChange={handleChange}
              onRejected={handleRejected}
              fontFamily="PPARegular"
              width="50vw"
              marginTop={30}
              renderFile={(file) => {
                const { name, size, type } = file;
                const fileRejection = fileRejections.find(
                  (fileRejection) => fileRejection.file === file
                );
                const { message } = fileRejection || {};
                return (
                  <FileCard
                    key={name}
                    isInvalid={fileRejection != null}
                    name={name}
                    onRemove={handleRemove}
                    sizeInBytes={size}
                    type={type}
                    validationMessage={message}
                    width="50vw"
                    marginBottom="15vh"
                    isLoading={false}
                  />
                );
              }}
              values={files}
            />

            <text className={styles.dialogtext2}>*select one</text>
            <div onClick={() => setIsShown(true)} className={styles.infobtn2}>
              Continue
            </div>
          </div>
        ) : (
          <div className={styles.dialogcon}>
            <text className={styles.dialogtext}>Add Nominee</text>
            <text className={styles.dialogtext2}>
              How to do want to add your nominees?
            </text>
            <div className={styles.dialog}>
              <div
                style={{
                  boxShadow: addmode === 1 ? "none" : "5px 5px 10px 0 #e6e6e6",
                  border: addmode === 1 ? "1.5px solid #1f56bd" : "none",
                  backgroundColor: addmode === 1 ? "#6b95d920" : "white",
                }}
                onClick={() => setaddmode(1)}
                className={styles.dialogbox}
              >
                <img alt="citsa vote" src="/form.png" />
                <text className={styles.infotxt}>Add nominees manually</text>
              </div>
              <div
                style={{
                  boxShadow: addmode === 2 ? "none" : "5px 5px 10px 0 #e6e6e6",
                  border: addmode === 2 ? "1.5px solid #1f56bd" : "none",
                  backgroundColor: addmode === 2 ? "#6b95d920" : "white",
                }}
                onClick={() => setaddmode(2)}
                className={styles.dialogbox}
              >
                <img alt="citsa vote" src="/upload.png" />
                <text className={styles.infotxt}>Upload a CSV file</text>
              </div>
            </div>

            <text className={styles.dialogtext2}>*select one</text>
            {addmode === 1 ? (
              <Link href={`/profile/add-nominee?id=${poll?.id}`}>
                <div className={styles.infobtn2}>Continue</div>
              </Link>
            ) : (
              <div
                onClick={() => {
                  setcsv(true);
                }}
                className={styles.infobtn2}
              >
                Continue
              </div>
            )}
          </div>
        )}
      </Dialog>

      <Dialog
        isShown={isShownWithdraw}
        onCloseComplete={() => {
          setisShownWithdraw(false);
        }}
        hasFooter={false}
        hasHeader={false}
        width="60%"
      >
        <div className={styles.dialogcon}>
          <text className={styles.dialogtext}>Withdrawal Request</text>
          <text className={styles.dialogtext2}>
            Funds will be sent to the account provided in less than 2 hours
          </text>
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Provider"
            required
            description="Mobile Money Network or Bank"
            value={bank}
            onChange={(e) => setbank(e.target.value)}
            marginTop={20}
            autoFocus={true}
          />
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Account Number"
            required={true}
            description="Mobile Money or Bank Account Number"
            value={account}
            onChange={(e) => setaccount(e.target.value)}
          />
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Account Name"
            required
            description="Name on the account"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Comment"
            description="Any comment or instruction"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          />

          <text className={styles.dialogtext2}>
            *We take 10% fee on withdrawal
          </text>
          <div onClick={handleWithdraw} className={styles.infobtn2}>
            {loading ? "Loading..." : "Withdraw"}
          </div>
        </div>
      </Dialog>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  let res = await fetch(BASE_URL + "/getPoll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  // console.log(res);
  let data = [];
  data = await res.json();

  // console.log(data);
  return { props: { data: data ? data : null } };
}
