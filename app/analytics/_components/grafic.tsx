"use client";

import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { Spent } from "@prisma/client";

interface GraficProps {
    spents: Spent[];
}

const Grafic = ({ spents }: GraficProps) => {
    const [options, setOptions] = useState<any>(null);
    const [yearExpense, setYearExpense] = useState(0);
    const [monthExpense, setMonthExpense] = useState(0);

    useEffect(() => {
        const categories: string[] = [];
        const data: number[] = Array(12).fill(0);

        spents.forEach((spent) => {
            const month = spent.date.getMonth();
            const expense = parseFloat(spent.price.toString());

            data[month] += expense;
        });

        setMonthExpense(data.map((value) => value).reduce((a, b) => a + b));

        setOptions({
            xaxis: {
                categories: [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez",
                ],

                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
            chart: {
                sparkline: {
                    enabled: false,
                },
                type: "bar",
                width: "100%",
                height: 500,
                toolbar: {
                    show: false,
                },
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: "100%",
                    borderRadiusApplication: "end",
                    borderRadius: 6,
                    dataLabels: {
                        position: "top",
                    },
                },
            },
            legend: {
                show: true,
                position: "bottom",
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                shared: true,
                intersect: false,
                triggerType: "click",
                theme: "dark",
                style: {
                    fontSize: "15px",
                },
                fillSeriesColor: false,
                formatter: function (value: any) {
                    return "R$" + value;
                },
            },
            series: [
                {
                    name: "Perdas",
                    data: data.map((value) => value),
                    color: "#F05252",
                },
            ],

            yaxis: {
                labels: {
                    show: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                        cssClass:
                            "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                    },
                },
            },
            grid: {
                show: true,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: -20,
                },
            },
        });
    }, [spents]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearExpense = spents
            .filter((spent) => spent.date.getFullYear() === currentYear)
            .reduce(
                (acc, spent) => acc + parseFloat(spent.price.toString()),
                0
            );
        setYearExpense(yearExpense);
    }, [spents]);

    useEffect(() => {
        if (
            options &&
            document.getElementById("bar-chart") &&
            typeof ApexCharts !== "undefined"
        ) {
            const chart = new ApexCharts(
                document.getElementById("bar-chart"),
                options
            );
            chart.render();
            chart.resetSeries();
        }
    }, [options]);

    return (
        <div className="p-5">
            <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-5 ">
                <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                    <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                            despesas
                        </dt>
                        <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                            R$
                            {monthExpense.toFixed(2)} este mês
                        </dd>
                    </dl>
                </div>
                <div className="grid grid-cols-2 py-3">
                    <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                            Despesas
                        </dt>
                        <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
                            - R$ {yearExpense.toFixed(2)} este ano
                        </dd>
                    </dl>
                </div>

                <div id="bar-chart"></div>
            </div>
        </div>
    );
};

export default Grafic;
