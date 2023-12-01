const express=require('express')
const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const {authenticateMiddleware} = require("../controllers/projectController")
const contactController = require("../controllers/conactController")
// const feedController = require("../controllers/feedController")
const servicesController = require("../controllers/servicesController")
const testimonialController = require("../controllers/testimonialController")
const {upload} = require("../middleware/multer");
const {getAllMessages , postNewMessage} = require('../controllers/messageController');
const router=express.Router()

// REGISTRATION, LOGIN, LOGOUT ROUTE
router.post("/register",userController.createUser)
router.put("/users",userController.updateUser)
router.post("/login",userController.loginUser)
router.post("/logout",userController.logoutController)
router.get("/user",authenticateMiddleware,userController.getUser)
router.get("/users",userController.getAllusers)


// PROJECT CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post("/projects", authenticateMiddleware,upload.single('project_image'), projectController.createProject);
router.get("/projects",authenticateMiddleware,projectController.getProjects)
router.delete("/projects",projectController.deleteProject)
router.put("/projects",upload.single('project_image'),projectController.updateProject)

// CONTACT FORM 
router.post("/contacts",authenticateMiddleware,contactController.submitContactForm)
router.get("/contacts",authenticateMiddleware,contactController.displayForm) 

// FEEDS CREATION, DISPLAY, DELETE, UPDATE ROUTE
// router.post("/feeds",authenticateMiddleware,upload.single('image'),feedController.createFeeds)
// router.get("/feeds", authenticateMiddleware,feedController.getFeeds)
// router.delete("/feeds",feedController.deleteFeed)
// router.put("/feeds",upload.single('image'),feedController.updateFeed)


// SERVICES CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post('/services', authenticateMiddleware,upload.single('service_image'), servicesController.createService);
router.get('/services',authenticateMiddleware, servicesController.getServices);
router.delete('/services', servicesController.deleteService);
router.put('/services',upload.single('service_image'), servicesController.updateService)



// TESTIMONIALS CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post('/testimonial',authenticateMiddleware,upload.single('client_image'),testimonialController.createTestimonial );
router.get('/testimonial', authenticateMiddleware,testimonialController.getTestimonials);
router.delete('/testimonial', testimonialController.deleteTestimonial);
router.put('/testimonial',upload.single('client_image'), testimonialController.updateTestimonial);


// MESSAGES
// Get all messages
router.get('/chat', getAllMessages);

// Post a new message
router.post('/chat', postNewMessage);

module.exports=router


