export const convertDate = (date: string)  => {
    let today = new Date().toDateString()
    let hour = new Date().getHours()
    let dateString = new Date(date).toDateString()
    if (hour > 18 && today === dateString) {
        return  "Tonight"
    } else if (hour < 18 && today === dateString) {
        return "Today"
    } else {
        let weekday = new Date(date).toLocaleDateString('en-us', { weekday: 'long'})
        let day = new Date(date).toLocaleDateString('en-us', { day: 'numeric'})
        return weekday + " " + day
    }
}