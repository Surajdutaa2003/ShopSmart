export const calculateEstimate = () => {
    const today = new Date()
    const deliveryDays = Math.floor(Math.random() * 5) + 2 
    const deliveryDate = new Date(today)
    deliveryDate.setDate(today.getDate() + deliveryDays)
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return deliveryDate.toLocaleDateString('en-US', options)
}