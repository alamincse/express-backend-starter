class DashboardController {
	async index(req, res) {
		Render.view(res, 'profile', {
			title: 'Dashboard',
		});
	}
}

module.exports = new DashboardController();