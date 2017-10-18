const express = require('express');

const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const scottieController = require('../controllers/scottieController');
const exampleController = require('../controllers/exampleController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', homeController.homePage);
router.get('/player-analysis', homeController.playerAnalysisPage);
router.get('/player-development', homeController.playerDevelopmentPage);
router.get('/team-scouting-report', homeController.teamScoutingReportPage);
router.get('/about', homeController.aboutPage);

router.get('/contact', homeController.contactPage);
router.post('/contact', 
	homeController.validateContactForm,
	catchErrors(homeController.sendContactForm)
);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/user', authController.isLoggedIn, authController.loggedIn);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
// 2. Register the user
// 3. Log them in
router.post('/register', 
	userController.validateRegister,
	userController.register,
	userController.notifyAdmin,
	authController.login
);

router.get('/logout', authController.logout);

router.get('/forgot', homeController.forgotPage);

router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', 
	authController.confirmedPasswords, 
	catchErrors(authController.update)
);


// Scottie Lindsey Player Development Product
router.get('/scottie-lindsey/analytical-report', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.analyticalReport);
router.get('/scottie-lindsey/visual-breakdown-assisted-vs-non-assisted', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownAssistedVsNonAssisted);
router.get('/scottie-lindsey/visual-breakdown-contested-vs-non-contested', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownContestedVsNonContested);
router.get('/scottie-lindsey/visual-breakdown-fga-by-area', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownFgabyArea);
router.get('/scottie-lindsey/visual-breakdown-isolation', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownIsolation);
router.get('/scottie-lindsey/visual-breakdown-off-ball-screens', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownOffBallScreens);
router.get('/scottie-lindsey/workouts-off-ball-screens', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.workoutsOffBallScreens);
router.get('/scottie-lindsey/visual-breakdown-pick-and-roll', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownPickAndRoll);
router.get('/scottie-lindsey/workouts-pick-and-roll', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.workoutsPickAndRoll);
router.get('/scottie-lindsey/visual-breakdown-shot-clock', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownShotClock);
router.get('/scottie-lindsey/visual-breakdown-shots-off-dribble', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownShotsOffDribble);
router.get('/scottie-lindsey/workouts-shots-off-dribble', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.workoutsShotsOffDribble);
router.get('/scottie-lindsey/visual-breakdown-spot-up-jump-shots', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownSpotUpJumpShots);
router.get('/scottie-lindsey/workouts-spot-up-jump-shots', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.workoutsSpotUpJumpShots);
router.get('/scottie-lindsey/visual-breakdown-transition', authController.isLoggedIn, authController.scottieLindseyPermission, scottieController.visualBreakdownTransition);


// Blog Section
router.get('/blog', homeController.blogHomePage);

// Player Development Example
router.get('/product-example/analytical-report', exampleController.analyticalReport);
router.get('/product-example/visual-breakdown-assisted-vs-non-assisted', exampleController.visualBreakdownAssistedVsNonAssisted);
router.get('/product-example/visual-breakdown-contested-vs-non-contested', exampleController.visualBreakdownContestedVsNonContested);
router.get('/product-example/visual-breakdown-fga-by-area', exampleController.visualBreakdownFgabyArea);
router.get('/product-example/visual-breakdown-isolation', exampleController.visualBreakdownIsolation);
router.get('/product-example/visual-breakdown-off-ball-screens', exampleController.visualBreakdownOffBallScreens);
router.get('/product-example/workouts-off-ball-screens', exampleController.workoutsOffBallScreens);
router.get('/product-example/visual-breakdown-pick-and-roll', exampleController.visualBreakdownPickAndRoll);
router.get('/product-example/workouts-pick-and-roll', exampleController.workoutsPickAndRoll);
router.get('/product-example/visual-breakdown-shot-clock', exampleController.visualBreakdownShotClock);
router.get('/product-example/visual-breakdown-shots-off-dribble', exampleController.visualBreakdownShotsOffDribble);
router.get('/product-example/workouts-shots-off-dribble', exampleController.workoutsShotsOffDribble);
router.get('/product-example/visual-breakdown-spot-up-jump-shots', exampleController.visualBreakdownSpotUpJumpShots);
router.get('/product-example/workouts-spot-up-jump-shots', exampleController.workoutsSpotUpJumpShots);
router.get('/product-example/visual-breakdown-transition', exampleController.visualBreakdownTransition);


module.exports = router;