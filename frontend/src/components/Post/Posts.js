import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./Scroll.css";
import React, { useEffect, useState } from "react";
import axios from "../../axiosinstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toast from "../Sweetalert/sweetAlert";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Features/userData";
import { createPost } from "../../Redux/Features/postData";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Posts() {
  const user = useSelector((state) => state.userData.value);
  const postsData = useSelector((state) => state.postData.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [postId, setPostId] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(false);
  const [askStatus, setAskStatus] = useState(false);
  const [askId, setAskId] = useState(false);
  const [request, setRequest] = useState("");

  const handleProfileClick = (id) => {
    navigate("/about",{state:{id:id}})
  }

  const handleConnectStatus = () => {
    axios
      .get(`api/user/details/${user._id}`, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        dispatch(login(res.data.user));
      });
  };

  const handleLike = (id) => {
    const value = !like;
    setLike(value);
    const data = {
      likes: value,
      postId: id,
      userId: user._id,
    };
    axios
      .post(`api/post/posts/like`, data, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        dispatch(createPost(res.data.posts));
      });
  };

  const handleComment = (id) => {
    const data = {
      comment: comment,
      postId: id,
      userId: user._id,
    };
    axios
      .post(`api/post/posts/comment`, data, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        dispatch(createPost(res.data.posts));
        setCommentStatus(!commentStatus);
      });
  };

  const handleConnect = (id) => {
    const data = {
      userId: user._id,
      connectionId: id,
    };
    axios
      .post(`api/user/connect`, data, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        const message = res.data.message;
        if (message === "Request failed") {
          Toast.fire({
            icon: "error",
            title: message,
          });
        } else {
          Toast.fire({
            icon: "success",
            title: message,
          });
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      });
    setStatus(!status);
    handleConnectStatus();
  };

  const handleChat = (id) => {
    console.log(id)
    const data = {
      senderId: user._id,
      receiverId: id,
    };
    axios
      .post("api/conversations/", data, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        console.log(res.data)
        const data = res.data.conversation;
        navigate("/messenger", { state: { chat: data } });
      });
  };

  const handleCommentStatus = (id) => {
    setCommentStatus(!commentStatus);
    setPostId(id);
  };

  const getAllPosts = () => {
    axios
      .get("api/post/posts/getAll", {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        dispatch(createPost(res.data.posts));
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getAllPosts();
    handleConnectStatus();
  }, [status]);

  const handleAsk = (id) => {
    setAskStatus(!askStatus);
    setAskId(id);
  };

  const handleRequest = (id) => {
    setAskStatus(!askStatus);
    const values = {
      request: request,
      userId: user._id,
      interviewerId: id,
    };
    if (request !== "") {
      axios.post("api/interview", values, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          const message = res.data.message;
          Toast.fire({
            icon: "success",
            title: message,
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Something went wrong",
          });
        });
    } else {
      Toast.fire({
        icon: "error",
        title: "Please fill all the details",
      });
    }
  };

  return (
    <Grid container>
      <Box
        height={470}
        className="scrollbar-hidden"
        sx={{ overflow: "scroll", borderRadius: "15px", width:'100%' }}
      >
        {postsData &&
          postsData.map((post, index) => (
            <Card
              key={index}
              sx={{ borderRadius: "15px", width: "80%", m: "10px auto" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: 1,
                  borderColor: "rgba(0, 0, 0, 0.38)",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    src={post.createdBy.profileImg}
                    sx={{ height: 55, width: 55, zIndex: 0 }}
                  ></Avatar>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      ml: 2,
                      justifyContent: "center",
                    }}
                  >
                    <Box width="100%">
                      <Typography sx={{cursor:'pointer'}} onClick={()=>handleProfileClick(post.createdBy._id)} fontSize="1rem">
                        {post.createdBy.name}
                      </Typography>
                    </Box>
                    <Box width="100%">
                      <Typography fontSize="0.8rem">
                        {post.createdBy.about}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {post.createdBy.interviewer && (
                  <Fab
                    sx={{ zIndex: 0 }}
                    onClick={() => handleAsk(post._id)}
                    color="primary"
                  >
                    Ask
                  </Fab>
                )}
              </CardContent>
              {askStatus && post._id === askId && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                  }}
                >
                  <Box
                    component={Paper}
                    width={400}
                    height="auto"
                    bgcolor="secondary.main"
                    borderRadius={7}
                    sx={{ p: 2, zIndex: 1 }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      maxRows={3}
                      onChange={(e) => setRequest(e.target.value)}
                      placeholder="Type here..."
                      variant="standard"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Box component={Paper} sx={{ mt: 5, width: 70, ml: 1 }}>
                        <Typography textAlign="center" sx={{ mt: 0.8 }}>
                          <CurrencyRupeeIcon />
                          500
                        </Typography>
                      </Box>
                      <Button
                        onClick={() => handleRequest(post.createdBy._id)}
                        variant="contained"
                        sx={{ mt: 5, mr: 1 }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box
                className="scrollbar-hidden"
                sx={{ width: "100%", height: 258, overflow: "scroll" }}
              >
                <Box sx={{ width: "100%", height: "100%", m: "10px auto" }}>
                  <Typography textAlign="center" m={2}>
                    {post.description}
                  </Typography>
                  <img
                    alt=""
                    src={post.postImg}
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "100%",
                    }}
                  ></img>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: 22,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{ ml: 2, fontWeight: 500 }}
                >
                  {post.likes.length} likes
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mr: 2, fontWeight: 500 }}
                >
                  {post.comments.length} comments
                </Typography>
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: 1,
                  borderColor: "rgba(0, 0, 0, 0.38)",
                }}
              >
                <Box>
                  <IconButton onClick={() => handleLike(post._id)}>
                    {post.likes
                      .map((d) => d)
                      .map((da) => da)
                      .includes(user._id) ? (
                      <ThumbUpAltIcon sx={{ fontSize: 30, color: "blue" }} />
                    ) : (
                      <ThumbUpOutlinedIcon sx={{ fontSize: 30 }} />
                    )}
                  </IconButton>
                  <IconButton onClick={() => handleCommentStatus(post._id)}>
                    <MessageOutlinedIcon
                      sx={{ fontSize: 30, ml: 3, zIndex: 0 }}
                    />
                  </IconButton>
                </Box>
                {!(
                  user.connections.includes(post.createdBy._id) ||
                  post.createdBy._id === user._id
                ) ? (
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "25px" }}
                    color="primary"
                  >
                    <Typography
                      onClick={() => handleConnect(post.createdBy._id)}
                      fontSize="1rem"
                    >
                      Follow
                    </Typography>
                  </Button>
                ) : (
                  !(post.createdBy._id === user._id) && (
                    <IconButton onClick={() => handleChat(post.createdBy._id)}>
                      <SendRoundedIcon sx={{ fontSize: 30, mr: 1 }} />
                    </IconButton>
                  )
                )}
              </CardContent>
              {commentStatus && post._id === postId && (
                <>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Box sx={{ width: "75%" }}>
                      <TextField
                        size="small"
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ m: "0 auto" }}
                        fullWidth
                        placeholder="Add a comment..."
                      />
                    </Box>
                    <Box>
                      <Button
                        size="small"
                        onClick={() => handleComment(post._id)}
                        variant="contained"
                        sx={{ m: "2.5px auto" }}
                      >
                        Post
                      </Button>
                    </Box>
                  </CardContent>
                  <CardContent>
                    {post.comments
                      .map((data) => data)
                      .map((comment) => comment)
                      .reverse()
                      .map((text) => (
                        <Box sx={{ display: "flex", width: "100%" }}>
                          <Box sx={{ width: "10%", mt: 1.2 }}>
                            <Avatar
                              src={text.commentedBy.profileImg}
                              sx={{ height: 38, width: 38 }}
                            ></Avatar>
                          </Box>
                          <Box
                            sx={{
                              width: "90%",
                              backgroundColor: "#f2f0f0",
                              borderRadius: "15px",
                              height: "auto",
                              mt: 1,
                            }}
                          >
                            <Typography
                              fontSize="0.9rem"
                              fontWeight={500}
                              marginLeft={1}
                              marginTop={1}
                            >
                              {text.commentedBy.name}
                            </Typography>
                            <Typography fontSize="0.7rem" marginLeft={1}>
                              {text.commentedBy.about}
                            </Typography>
                            <Typography
                              fontSize="0.9rem"
                              fontWeight={500}
                              marginLeft={1}
                              marginTop={1}
                            >
                              {text.comment}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                  </CardContent>
                </>
              )}
            </Card>
          ))}
      </Box>
    </Grid>
  );
}

export default Posts;
