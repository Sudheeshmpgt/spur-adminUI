import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import "./Scroll.css";
import React, { useEffect, useState } from "react";
import axios from "../../axiosinstance";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPost } from "../../Redux/Features/postData";


function MyPosts() {
   const user = useSelector((state) => state.userData.value);
  const [myPosts, setMyPosts] = useState([]);
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [postId, setPostId] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getPostData = () => {
      axios
        .get(`api/post/posts/${user._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setMyPosts(res.data.posts)
        });
    };
    getPostData();
  },[])

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
        const posts = res.data.posts.filter((data)=>data.createdBy._id === user._id);
        setMyPosts(posts)
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
        const posts = res.data.posts.filter((data)=>data.createdBy._id === user._id);
        setMyPosts(posts)
        setCommentStatus(!commentStatus);
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


  return (
    <Grid container>
      <Box
        height={570}
        className="scrollbar-hidden"
        sx={{ overflow: "scroll", borderRadius: "15px", width:'100%', mt:'140px' }}
      >
        {myPosts &&
          myPosts.map((post, index) => (
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
                      <Typography fontSize="1rem">
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
              </CardContent>
              <Box
                className="scrollbar-hidden"
                sx={{ width: "100%", height: 300, overflow: "scroll" }}
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
                <Box width='100%' sx={{display:'flex', justifyContent:'space-between'}}>
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
                      sx={{ fontSize: 30, zIndex: 0 }}
                    />
                  </IconButton>
                </Box>
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
  )
}

export default MyPosts