import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
 axios
      .post("http://localhost:8000/api/v1/getVdoCipherOTP", {
        // videoId: videoUrl,
          videoId: "83a348639bec41e9bbd4567211bee250",
      })
        .then((res) => {
          console.log("Video Data:", res.data); // 打印视频 OTP 和播放信息
          setVideoData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching video data:", error.response?.data || error.message);
        });
  }, [videoUrl]);
  return (
      <div>
        {videoData.otp && videoData.playbackInfo ? (
            <div style={{position: "relative", paddingTop: "56.25%", overflow: "hidden"}}>
              <iframe
                  src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  allowFullScreen={true}
                  allow="encrypted-media"
              ></iframe>
            </div>
        ) : (
            <p>Loading video...</p>
        )}
      </div>
  );
};

export default CoursePlayer;
