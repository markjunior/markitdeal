var express         =   require("express"),
    app             =   express(),
    bodyParser      =   require("body-parser"),
    mongoose        =   require("mongoose"),
    passport        =   require("passport"),
    LocalStrategy   =   require("passport-local"),
    methodOverride  =   require("method-override"),
    Deal            =   require("./models/deal"),
    Comment         =   require("./models/comment"),
    User            =   require("./models/user"),
    seedDB          =   require("./seeds"),
    flash           =   require("connect-flash");
    
var commentRoutes   =   require("./routes/comments"),
    dealRoutes      =   require("./routes/deals"),
    authenRoutes      =   require("./routes/authen");

//seedDB();    
//mongoose.connect('mongodb://localhost/markitdeal', {useMongoClient: true});
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});


mongoose.Promise= global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());


app.use(require("express-session")({
    secret: 'I am Mark',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser= req.user;
   res.locals.error = req.flash('error');
   res.locals.success = req.flash('success');
   next();
});

app.use(authenRoutes);
app.use(commentRoutes);
app.use(dealRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('starts ...');
})