// import form data
const formResults = document.getElementById("form");

// define variables
let velocity, rollover, engineers, daysUnavailable;

// add event listener to form
formResults.addEventListener("submit", function(event){
  event.preventDefault(); // prevent form from submitting

  // access form elements
  velocity = document.getElementById("velocityInput").value;
  rollover = document.getElementById("rolloverInput").value;
  engineers = document.getElementById("engineersInput").value;
  daysUnavailable = document.getElementById("removeDaysInput").value;

  calculateRecommendedVelocity(velocity, rollover, engineers, daysUnavailable);
});

function calculateRecommendedVelocity(velocity, rollover, engineers, daysUnavailable){
  
  const sprint = 10;
  const engineerHours = (sprint * 8) * engineers;  // convert sprint from days to engineering hours
  const velocityInHrs = velocity / engineerHours; // convert velocity to hourly output

  // convert daysUnavailable into hours
  const adjustedUnavailable = (daysUnavailable * 8);
  
  const adjustedCapacity = (engineerHours - adjustedUnavailable); // subtract unavailablity + rollover from engineer hours
  const adjustedVelocity = Math.round((velocityInHrs * adjustedCapacity)) - rollover; // convert hours back to velocity as a whole number
  const aggressive = Math.round(adjustedVelocity + 3);
  const standard = Math.round(adjustedVelocity); 
  const mild = Math.round(adjustedVelocity - 2);


  // send to UI
  document.getElementById("aggressive").textContent = `Aggressive - We want to boost velocity:  ${ aggressive }`;
  document.getElementById("standard").textContent = `Standard:  ${ standard }`;
  document.getElementById("mild").textContent = `Mild - Let's take it easy:  ${ mild }`;

};
