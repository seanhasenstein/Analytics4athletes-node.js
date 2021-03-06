exports.analyticalReport = (req, res) => {
	res.render('./scottie-lindsey/analytical-report', { title: 'Scottie Lindsey' });
};

exports.visualBreakdownAssistedVsNonAssisted = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-assisted-vs-non-assisted', { title: 'Assisted vs. Non-Assisted Visual Breakdown' });
};

exports.visualBreakdownContestedVsNonContested = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-contested-vs-non-contested', { title: 'Contested vs. Non-Contested Visual Breakdown' });
};

exports.visualBreakdownNonContested = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-non-contested', { title: 'Non-Contested Visual Breakdown' });
};

exports.visualBreakdownFgabyArea = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-fga-by-area', { title: 'FGA by Area Visual Breakdown' });
};

exports.visualBreakdownIsolation = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-isolation', { title: 'Isolation Visual Breakdown' });
};

exports.visualBreakdownOffBallScreens = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-off-ball-screens', { title: 'Off Ball Screens Visual Breakdown' });
};

exports.workoutsOffBallScreens = (req, res) => {
	res.render('./scottie-lindsey/workouts-off-ball-screens', { title: 'Off Ball Screen Workouts' });
};

exports.visualBreakdownPickAndRoll = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-pick-and-roll', { title: 'Pick & Roll Visual Breakdown' });
};

exports.workoutsPickAndRoll = (req, res) => {
	res.render('./scottie-lindsey/workouts-pick-and-roll', { title: 'Pick & Roll Workouts' });
};

exports.visualBreakdownShotClock = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-shot-clock', { title: 'Shot Clock Visual Breakdown' });
};

exports.visualBreakdownShotsOffDribble = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-shots-off-dribble', { title: 'Shots Off of the Dribble Visual Breakdown' });
};

exports.workoutsShotsOffDribble = (req, res) => {
	res.render('./scottie-lindsey/workouts-shots-off-dribble', { title: 'Shots Off of the Dribble Workouts' });
};

exports.visualBreakdownSpotUpJumpShots = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-spot-up-jump-shots', { title: 'Spot Up Jump Shots Visual Breakdown' });
};

exports.workoutsSpotUpJumpShots = (req, res) => {
	res.render('./scottie-lindsey/workouts-spot-up-jump-shots', { title: 'Spot Up Jump Shot Workouts' });
};

exports.visualBreakdownTransition = (req, res) => {
	res.render('./scottie-lindsey/visual-breakdown-transition', { title: 'Transition Visual Breakdown' });
};