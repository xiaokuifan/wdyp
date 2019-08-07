//npm init -y
//cnpm install express mysql --save-dev
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mydb = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "peasreviews"
});
mydb.connect();

const app = express();
//启用bodyParser post请求需要
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//解决跨域问题
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
	// 可以接受跨域的客户端传递过来的cookie
	//axios express设置跨域允许传递cookie
	res.setHeader("Access-Control-Allow-Credentials", true);

	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});

// cookie和session
let secret = 'H5190304';
app.use(cookieParser());
app.use(session({
	secret: secret,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 7 * 24 * 3600000 }
}))


//注册
app.post('/reg', (req, res) => {
	let sql = 'select * from admin where 1 ';
	if (req.body.num) {
		sql += "AND account='" + req.body.num + "'";
	}
	mydb.query(sql, (err, results) => {
		if (results.length > 0) {
			res.json({
				msg: "account_already_exist"
			})
		} else {
			let newsql = `insert into admin(account,pass) values ("${req.body.num}","${req.body.pass}")`;
			mydb.query(newsql, (err, results) => {
				if (err) {
					console.log(err);
					return;
				}
				res.json({
					msg: "reg_success"
				})
			})
		}
	});
});
//登录
app.post('/login', (req, res) => {
	let sql = 'select * from admin WHERE 1 ';
	if (req.body.num) {
		sql += " AND account='" + req.body.num + "'";
	}
	mydb.query(sql, (err, results) => {
		if (results.length == 0) {
			res.json({
				msg: "account_no_exist"
			})
		}
		else if (req.body.num == results[0].account) {

			if (req.body.pass == results[0].pass) {
				// 登录成功的标记符号
				req.session.id = results[0].id;
				req.session.account = req.body.num;
				res.json({
					msg: "login_success"
				})
			} else {
				res.json({
					msg: "false password"
				})
			}
		}
	});
});
//获取电影列表
app.get("/movie", function (req, res) {
	let sql = 'select * from movie ';
	mydb.query(sql, (err, results) => {
		if (err) {
			console.log(err);
		}
		res.send(results);
	});
})
//获取电影列表limit15
app.get("/movielimit", function (req, res) {
	let sql = 'select * from movie limit 15';
	mydb.query(sql, (err, results) => {
		if (err) {
			console.log(err);
		}
		res.send(results);
	});
})
//获取电影列表追加add
app.get("/movieadd", function (req, res) {
	let sql = 'select * from movie where id >15';
	mydb.query(sql, (err, results) => {
		if (err) {
			console.log(err);
		}
		res.send(results);
	});
})
//获取电影列表倒序
app.get("/moviereverse", function (req, res) {
	let sql = 'SELECT * FROM movie ORDER BY id DESC';
	mydb.query(sql, (err, results) => {
		if (err) {
			console.log(err);
		}
		res.send(results);
	});
})
//获取详情信息
app.get("/moviedetail", function (req, res) {
	let sql = 'select * from movie WHERE 1 ';
	if (req.query.id) {
		sql += " AND id='" + req.query.id + "'";
	}
	mydb.query(sql, (err, results) => {
		if (err) {
			console.log(err);
		}
		res.send(results[0]);
	});
})
//获取热门推荐
app.get("/hotrec", function (req, res) {
	let sql = 'select * from hot ';
	mydb.query(sql, (err, results) => {
		if (err) {
			console.log(err);
		}
		res.send(results);
	});
})

//获取最受欢迎影评
app.get("/polist", function (req, res) {
	let sql = 'select * from popular ';
	mydb.query(sql, (err, results) => {
		if (err) {
			console.log(err);
		}
		res.send(results);
	});
})


app.get("/getAccount", function (req, res) {
	res.json({ account: req.session.account });
});


app.listen(8282, function () {
	console.log("服务成功开启，监听端口8282……")
})