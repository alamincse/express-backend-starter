class RenderService {
	static view(res, view, data = {}) {
		res.render(view, data, (err, html) => {
			if (err) {
        		console.error('Render Error:', err.stack ?? err.message);
        		
        		return res.status(500).render('errors/error', {
          			title: 'Error',
          			message: err.message
        		});
        	} else {
        		res.send(html);
        	}
		});
	}
}

module.exports = RenderService;