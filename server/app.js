const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
//const fs = require('fs').promises;
const util = require('util');
const fs = require('fs');
const rename = util.promisify(fs.rename);
const cors = require('cors');
const newUser = require("../server/Schemas/userSchema");
const newPost = require("../server/Schemas/postSchema")
const multer = require("multer");
//const { default: Posts } = require("../client/src/Posts");
const uploadMiddleWare = multer({ dest: "uploads/" })
const app = express();
const port = 400;

const uri = "mongodb+srv://hebaragheb:hg672002@firstone.srtc7t6.mongodb.net/?retryWrites=true&w=majority&appName=firstOne";
mongoose.set('strictQuery', false);

// Configure CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use(cookieParser())
app.use('/uploads', express.static('uploads/'))
// Connect to MongoDB
const conectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(uri)
    console.log("connected")
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

conectDB();

// Register Endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await newUser.create({
      username,
      password: hashedPassword
    });
    res.status(201).json(userDoc);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await newUser.findOne({ username });
    if (!userDoc) {
      return res.status(400).json("Invalid credentials");
    }
    const passOk = await bcrypt.compare(password, userDoc.password);
    if (passOk) {
      const token = jwt.sign({ _id: userDoc._id, username }, 'jwtSecret', { expiresIn: "20m" });
      res.cookie('token', token, { httpOnly: true }).json({
        id: userDoc._id,
        username,
      });
    } else {
      res.status(400).json("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: error.message });
  }
});
/*app.get('/profile',async (req,res)=>{
const {token} = req.cookies
 jwt.verify(token,"shhhh",{},(err,info)=>{
 if (err) throw err
 res.json(info);
 })
/*try {
    const info = jwt.verify(token, "shhhhh");
    res.json(info);
  } catch (err) {
   res.status(401).json({ error: 'Invalid token' });
  }
})*/app.get('/profile', async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const info = jwt.verify(token, 'jwtSecret');
    res.json(info);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
app.post('/logout', (req, res) => {
  res.cookie('token', '').json("ok")
  //res.json('')
})
/*app.post('/creatPost',uploadMiddleWare.single('file'),async (req,res)=>{
  res.json({files:req.file})
  const {originalname,path} = req.file
  const parts= originalname.split('.');
  const ext = parts[parts.length-1];
  const newPath = path + '.' + ext;
 // fs.renameSync(path,newPath)
 const { token } = req.cookies;
 if (!token) {
   return res.status(401).json({ error: 'Unauthorized' });
 }
 try {
   const info = jwt.verify(token, "shhhh");
   //res.json(info);
 } catch (err) {
   res.status(401).json({ error: 'Invalid token' });
 }

  const {title,summary,content,cover,auther} = req.body;
  const info = jwt.verify(token, "shhhh");
  const post = await newPost.create({
    title,
   /* auther,
    summary,
    content,
    cover:newPath,
    auther:info._id
  })
  res.json(post)

})app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  await fsExtra.rename(path, newPath);

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const info = jwt.verify(token, "shhhh");
    const { title, summary, content, cover, author } = req.body;

    const post = await newPost.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info._id
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;


  try {
    await rename(path, newPath);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error renaming file' });
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const info = jwt.verify(token, 'jwtSecret');
    const { title, summary, content, cover, auther } = req.body;

    const post = await newPost.create({
      title,
      summary,
      content,
      cover: newPath,
      auther: info._id
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/post', async (req, res) => {
  res.json(await newPost.find().populate('auther', ['username']))
});
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  //const postId = mongoose.Types.ObjectId(id); // Convert string id to ObjectId
  const postDoc = await newPost.findById(id).populate('auther', ['username']);
  res.json(postDoc);
});
app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;

  try {
    await rename(path, newPath);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error renaming file' });
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const info = jwt.verify(token, 'jwtSecret');
    const { id, title, summary, content, cover, auther } = req.body;

    const postDoc = await newPost.findById(id);
    if (!postDoc) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (JSON.stringify(postDoc.auther) !== JSON.stringify(info._id)) {
      return res.status(403).json({ error: 'Unauthorized to update post' });
    }

    const updateData = {
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    };

    await postDoc.updateOne(updateData);
    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
