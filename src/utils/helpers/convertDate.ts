export const convertDate = (date: string)  => {
    let today = new Date().toDateString()
    let hour = new Date().getHours()
    let dateString = new Date(date).toDateString()
    let weekday = new Date(date).toLocaleDateString('en-us', { weekday: 'long'})
    let day = new Date(date).toLocaleDateString('en-us', { day: 'numeric'})
    if (hour > 18 && today === dateString) {
        return {date: date, convertDate: "Tonight"}
    } else if (hour < 18 && today === dateString) {
        return {date: date, convertDate: "Today"}
    } else {
        return {date: date, convertDate: weekday + " " + day}
    }
}