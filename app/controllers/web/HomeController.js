class HomeController {
	async index(req, res) {
		RenderService.view(res, 'home', {
			title: 'Login',
		});
  	}

  	async register(req, res) {
  		RenderService.view(res, 'register', { 
			title: 'register', 
		});
  	}
}

module.exports = new HomeController();