export function calculateTotals(spent: any, currentDate: any) {
    let totalToday = 0;
    let totalWeek = 0;
    let totalMonth = 0;

    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    spent.forEach((item: any) => {
        const itemDate = new Date(item.date);
        const itemPrice = parseFloat(item.price.toFixed(2));

        if (itemDate.toDateString() === currentDate.toDateString()) {
            totalToday += itemPrice;
        }

        if (itemDate >= oneWeekAgo && itemDate <= currentDate) {
            totalWeek += itemPrice;
        }

        totalMonth += itemPrice;
    });

    return { totalToday, totalWeek, totalMonth };
}
