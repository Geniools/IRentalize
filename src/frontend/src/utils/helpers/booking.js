export const getDatesBetween = (startDate, endDate) => {
    // Get the dates between the start and end dates
    const dates = [];
    const currentDate = new Date(startDate);
    const stopDate = new Date(endDate);

    while (currentDate <= stopDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}