class HomeController {
	async index(req, res) {
		Render.view(res, 'home', {
			title: 'Login',
		});
  	}

  	async register(req, res) {
  		Render.view(res, 'register', { 
			title: 'register', 
		});
  	}
}

module.exports = new HomeController();