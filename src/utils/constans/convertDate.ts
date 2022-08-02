export const convertDate = (date: string)  => {
    let today = new Date().toDateString()
    let dateString = new Date(date).toDateString()
    if (today === dateString) {
        return  "Today"
    } else {
        let weekday = new Date(date).toLocaleDateString('en-us', { weekday: 'long'})
        let day = new Date(date).toLocaleDateString('en-us', { day: 'numeric'})
        console.log(weekday + " " + day)
        return weekday + " " + day
    }
}
