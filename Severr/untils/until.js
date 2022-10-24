import jwt from 'jsonwebtoken'
import multer from "multer";
import path from "path";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET || "danghuuphuc",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  // const authorization  = req.header('x-auth-token');
  // if (!authorization ) return res.status(401).send({ message:'Invalid token' });

  // try {
  //   const token =authorization.slice(7, authorization.length);
  //   const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "danghuuphuc");
  //   req.user = decoded;

  //   return next();
  // } catch (ex) {
  //   res.status(400).send({message:'Invalid auth token...'});
  // }

  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "danghuuphuc",
      (err, decode) => {
        if (err) {
          res.status.send({ message: "invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "no token" });
  }
};

export const isAdmin = (req, res, next) => {
  isAuth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
