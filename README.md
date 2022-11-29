# Test for Front-end Developer

This is typical task that our developers would work on. Your goal is to complete it to the best of your abilities.

We are using Angular 7 with NGRX, to get the data, we are using GraphQL as an intermediate data relay service. You can find a JSON file attached to this card with data sets inside, just as the GQL service would return in a normal REST call. Please use it as a mock data set, and load them into your store/state.

There’s also 2 screenshots to give you a visual of what to build. No need to make it look the same, this is to guide you.
Feel free to select free and secure libraries using npm to achieve your goal.

1. ## Task User Story
As a Landlord, I want to see a calendar view which displays all the appointments I have with applicants to my properties, so that I can get a clear overview them.
Acceptance Criteria
Build a fully usable calendar component with the following functionality:

1. Main calendar view (see screenshot “calender.png”), which the view of a full week
- Shows Appointments on their time and date
- Arrows < > change weeks
- Click on Appointment will open a modal with information about the Flat and Visitors. Do not "Create Viewing"
- Landlords can scroll inside view to see time from 8am to 8pm

2. Small Month overview Calendar (in the upper left corner )
- Click on date
- update Week Calendar and show appointment in the given week • Change selected date
- Arrows < > allow you to switch months

3. Appointment Modal (see screenshot “click-on-appointment.png”)
- Appears when you click on the appointment
- Arrows will Switch to next Appointment
- Hide arrows if there is none

2. ## Delivery
- Complete Project so we can just run it with npm run start to look if its work
- without NodeModules
- on complicated Parts it would be nice that he could add some comments
- packed all together in a zip file