import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { toast } from "react-toastify";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  onClickStartMeeting,
}) {
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

  const resetState = () => {
    setMeetingId("");
    setMeetingIdError(false);
    setIsCopied(false);
    setParticipantName("");
    setIscreateMeetingClicked(false);
    setIsJoinMeetingClicked(false);
  };

  return (
    <div className="flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5">
      {iscreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-2 py-3 flex items-center justify-center">
          <p className="text-base">
            <p className="text-gray-500 font-thin">Meeting code: </p>
            <span className="text-purple-350 font-bold ml-1">{meetingId}</span>
          </p>
          <button
            className="ml-16"
            onClick={() => {
              const copyMessage =`\n🎉 You're invited to join a TeamMeet conversation at:\n🔗 https://sg34-peermeet.web.app/\n\n\n🚀 Meeting ID: ${meetingId}\n\n\nJoin us and let's connect! 🌐`;
              navigator.clipboard.writeText(copyMessage);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-gray-500 hover:text-gray-200" />
            )}
          </button>
          <button
            className="ml-2 text-gray-500 hover:text-gray-100 text-3xl"
            onClick={() => {
              const copyMessage =`\n🎉 You're invited to join a TeamMeet conversation at:\n🔗 https://sg34-peermeet.web.app/\n\n\n🚀 Meeting ID: ${meetingId}\n\n\nJoin us and let's connect! 🌐`;
              const subject = "Join the TeamMeet Conversation!";
              const body = encodeURIComponent(copyMessage);
              window.open(`mailto:?subject=${subject}&body=${body}`);
            }}
          >
            »
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={meetingId}
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            placeholder={"Enter meeting ID"}
            className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          {meetingIdError && (
            <p className="text-xs text-red-600">Please enter valid meeting ID</p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
          />

          <button
            disabled={participantName.length < 2}
            className={`w-full ${
              participantName.length < 2
                ? "bg-gray-650 text-gray-500 hover:ring-2 ring-gray-500"
                : "bg-purple-350 text-gray-100 hover:ring-2 ring-purple-300"
            } px-2 py-3 rounded-xl mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                onClickStartMeeting();
              } else {
                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(meetingId);
                } else setMeetingIdError(true);
              }
            }}
          >
            {iscreateMeetingClicked ? "Start meeting" : "Join meeting"}
          </button>
          <button
            className="w-full bg-gray-700 text-gray-500 px-2 py-3 rounded-xl mt-5 hover:ring-2 ring-gray-500"
            onClick={resetState}
          >
            Go back
          </button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full">
            <div className="text-left mb-10 max-w-lg px-4">
              <h1 className="text-4xl font-bold mb-4 leading-tight text-white">
                A Collaborative Platform for Everyone
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                TeamMeet isn't like the rest. All of the interviews, meetings, and more
                can be done on this device, wherever they want, through a one-stop
                shop.
              </p>
            </div>
            <button
              className="w-full bg-purple-350 text-gray-100 px-2 py-3 rounded-xl"
              onClick={async (e) => {
                const { meetingId, err } = await _handleOnCreateMeeting();
                if (meetingId) {
                  setMeetingId(meetingId);
                  setIscreateMeetingClicked(true);
                } else {
                  toast(`${err}`, {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            >
              Create meeting
            </button>
            <button
              className="w-full bg-gray-650 text-gray-100 px-2 py-3 rounded-xl mt-5"
              onClick={(e) => {
                setIsJoinMeetingClicked(true);
              }}
            >
              Join meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
