module.exports = {
  apps : [{
    name        : "fleetnext-ui",
    script      : "npm run start ", // path needs to be relative from ecosystem.config.js
    interpreter : "none",
    watch       : true, // any changes to app folder will get pm2 to restart app
    env         : {
	"SKIP_PREFLIGHT_CHECK":true,
	"REACT_APP_FLEET_NEXT_API_URL":'localhost:8000',
	"REACT_APP_URL_NAME":'101.53.132.110',
    }
  }]
}
