export const reservationCompleteTemplate = (
  registrationNumber: string,
  startTime: string,
  endTime: string,
  duration: string,
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title></title>
  </head>
  <body style="background-color: rgb(255, 250, 244);width: 600px;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;display: flex;justify-content: center;">
	  <main style="display: flex;justify-content: center;align-items: center;width: 600px;">
		  <div style="background-color: white;text-align: center;min-height: 30vh; min-width: 30vw;width:600px">
			  <h1>Reservation complete</h1>
			  <p style="margin-bottom: 1.2em;">Information about your reservation</p>
			  <div class="center">
				  <div style="display: flex;justify-content: space-between; background-color: rgb(108, 213, 255);padding: 1.5em;border-radius: 25px;border: none;color:rgb(0, 0, 0);font-size: 1em;margin: 2em;font-size: 1.4em;">
					  <div style="text-align: left;width: 100%;">
						  <p>Registration number:</p>
						  <p>Arriving on:</p>
						  <p>Leaving on:</p>
						  <p>Duration:</p>
					  </div>
					  <div style="text-align: right; width: 100%;">
						  <p>${registrationNumber}</p>
						  <p>${startTime}</p>
						  <p>${endTime}</p>
						  <p>${duration}</p>
					  </div>
				  </div>
				  <p style="text-align: center;font-size: 2em;">Enjoy your stay!</p>
			  </div>
			  <div style="background-color: rgb(0, 0, 0);min-height: 5vh;color: white;width: 100%;margin-top: 4em;text-align: center;height: 100%;">
					  <small>Copyright yosko99© 2023</small> <br/>
			  </div>
		  </div>
	  </main>
  </body>
  </html>
	`;
};
