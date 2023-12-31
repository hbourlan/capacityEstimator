// import form data
const formResults = document.getElementById("form");

// define variables
let velocity, sprint, engineers, daysUnavailable;

// add event listener to form
formResults.addEventListener("submit", function(event){
  event.preventDefault(); // prevent form from submitting

  // access form elements
  velocity = document.getElementById("velocityInput").value;
  sprint = document.getElementById("sprintInput").value;
  engineers = document.getElementById("engineersInput").value;
  daysUnavailable = document.getElementById("removeDaysInput").value;

  calculateRecommendedVelocity(velocity, sprint, engineers, daysUnavailable);
});

function calculateRecommendedVelocity(velocity, sprint, engineers, daysUnavailable, hoursUnavailable){
  
  const engineerHours = (sprint * 8) * engineers;  // convert sprint from days to engineering hours
  const velocityInHrs = velocity / engineerHours; // convert velocity to hourly output

  // convert daysUnavailable into hours
  const adjustedUnavailable = daysUnavailable * 8;
  
  const adjustedCapacity = engineerHours - adjustedUnavailable; // subtract hours unavailable from engineer hours
  const adjustedVelocity = Math.round((velocityInHrs * adjustedCapacity)); // convert hours back to velocity as a whole number
  const aggressive = Math.round(adjustedVelocity + 4); // Add 20% increase to velocity
  const standard = Math.round(adjustedVelocity + 3);  // Add 15% increase to velocity
  const mild = Math.round(adjustedVelocity);  // round velocity to whole number

  // concatenate values into a single line
  const aggressiveCapacity = (adjustedVelocity + 1) + " - " + aggressive;
  const standardCapacity = adjustedVelocity + " - " + standard;
  const mildCapacity = (adjustedVelocity - 2) + " - " + mild;

  // send to UI
  document.getElementById("aggressiveCapacity").textContent = `Aggressive - We want to boost velocity:  ${ aggressiveCapacity }`;
  document.getElementById("standardCapacity").textContent = `Standard:  ${ standardCapacity }`;
  document.getElementById("mildCapacity").textContent = `Mild - Let's take it easy:  ${ mildCapacity }`;

};
