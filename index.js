// Your code here
//create function which takes in array as argument
function createEmployeeRecord(arr) {
    
    //create an object which places employee info into-
    //an array in orderly fashion

    const employeeInfoTemplate = {
        firstName: arr[0], 
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    // return the object. createEmployeeRecord is now an object. an object containing placeholders for employees information
    return employeeInfoTemplate;
}

function createEmployeeRecords(employeeData) {
    /*function accepts array as argument. Each element of that array is an array itself
    Here, we iterate through that element and insert that data into the employeeInfo template(by passing it as an argument) which puts the actual
    employees information into the object. */
    const insertEmployeeInfo = employeeData.map(  (element) => {
        return createEmployeeRecord(element);       
    } );
    //insertEmployeeInfo is now an array of objects. The objects contain the information of actual employees
    return insertEmployeeInfo;
}

function createTimeInEvent(employeeInfo, dateStamp) {
    
    const separated = dateStamp.split(" ");
    const hourIn = parseInt(separated[1], 10)
    const newTimeInEvent = {
        type: "TimeIn",   
        hour: hourIn,
        date: separated[0]
    }
    employeeInfo.timeInEvents.push(newTimeInEvent);
    return employeeInfo;
}

function createTimeOutEvent(employeeInfo, dateStamp) {
    /**the timeOut key in the first function is an empty array. 
     That array is going to contain an object. 
     That object is going to contain a hour and date key. Those keys will contain the employees actual time of exit
    */
   /**The dateStamp contains both the date and hour in string form.
    separate the two via split. The split returns two arrays. First array contains the date while second array contains time
    the time array contains the time in the form of a string. That time needs to be converted into an int. */
   const separated = dateStamp.split(" ");
   const hourOut =  parseInt(separated[1], 10);
    const newTimeOutEvent = {
        type: "TimeOut",
        hour: hourOut,
        date: separated[0]
    }
    /**The employeeInfo argument is technically the createEmployeeRecords function(which by return value is now an object)
     So employeeInfo contains the key of timeOutEvents which at this point is still empty despite the other keys of firstName, familyName,
     etc being filled. So we're going to push in the newTimeOutEvent into that empty array
     */
    employeeInfo.timeOutEvents.push(newTimeOutEvent);
    return employeeInfo;
}

function hoursWorkedOnDate(employeeInfo, dateOnForm) {
    //this function takes in the employeeInfo object and gets the hours worked for that employee for a given date(dateOnForm)
    /**first off we have to make sure we are getting the hourclocked in and hour clocked out for the right date
     * this is done with an if statement
     * if they match, we go through the employees info(card) and get the hour clocked in and hour clocked out.
     * once we have that info, subtract time clocked in from time clocked out. this would look something like 1500 - 1100.
     * This represents that they worked from 1100-1500 a time difference of 400
     * That would need to be divided by 100 to get the time in hours
     */
    //find time in event where the dateOnForm matches the date
    const foundTimeInEvent = employeeInfo.timeInEvents.find(  (eventIn) => {return eventIn.date === dateOnForm}  );
    //in that time in event, get the hour and store into gotIn variable
    const gotIn = foundTimeInEvent.hour;
    //find timeout event where the dateOnForm matches the date
    const foundTimeOutEvent = employeeInfo.timeOutEvents.find(  (eventOut) => {return eventOut.date === dateOnForm}  );
    //in that time in event, get the hour and store into gotIn variable
    const gotOut = foundTimeOutEvent.hour;
    const hoursWorked = (gotOut - gotIn) / 100;
    return hoursWorked;       

}

function wagesEarnedOnDate(employeeInfo, dateOnForm) {
    //one of the keys in employeeInfo is payPerHour. That key contains the employee pay rate.
    /**acess the pay rate and store inside payRate variable
     next, find out how many hours the said employee worked. good thing theres a function for that.
     we pass this functions arguments as the arguments for that function. The function returns us num of hours worked
     finally, return hours worked multiplied by pay rate.
     */
    const payRate = employeeInfo.payPerHour;
    const hoursWorked = hoursWorkedOnDate(employeeInfo, dateOnForm);
    const payOwed = payRate * hoursWorked;

    return payOwed;
}

function allWagesFor(employeeInfo) {
    
    //use employeeInfo to get an array of work dates
    const arrayOfWorkDates = employeeInfo.timeInEvents.map(  (punchCard) => { return punchCard.date;}  );
    //use each work date as agrument in wagesEarnedOnDate
    const totalWages = arrayOfWorkDates.reduce(  (accumulator, workDate) => {
        return accumulator + wagesEarnedOnDate(employeeInfo, workDate)
    }, 0);
    
    return totalWages;

}

function calculatePayroll(arrayOfRecords) {
    //arrayOfRecords is an array which contains arrays. Each array has an employees record(in form of object)
    //for each record in arrayofrecords, call the allwagesfor function 
    //create an empty array which will store the wages for each employee
    const arrayofWages = [];
    arrayOfRecords.forEach(employeeInfo => {
        //when given the an employees record, the allWagesFor function calculates the total amount that employee is owed based on hours worked
        //so for each record here, we'll calculate the wage and push into arrayOfWages 
        arrayofWages.push(allWagesFor(employeeInfo));
          
    });
    //the purpose of this function is to get the total amount owed to all employees
    //arrayOfRecords now has each employees total wages. Here, we combine all those wages and we have the payroll
    const payroll = arrayofWages.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)
    return payroll;

}

function findEmployeeByFirstName(srcArray, firstName) {
    const foundName = srcArray.find(  (record) => {
        return record.firstName === firstName
    } );
    return foundName;
}


//   //for each record in arrayofrecords, call the allwagesfor function 
//   return arrayOfRecords.forEach(employeeInfo => {
//     return allWagesFor(employeeInfo);
// });



