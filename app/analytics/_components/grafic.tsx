"use client";

import { useEffect } from "react";
import ApexCharts from "apexcharts";

interface SeriesData {
    name: string;
    color?: string;
    data: string[];
}

interface Options {
    series: SeriesData[];
    chart: {
        sparkline: {
            enabled: boolean;
        };
        type: string;
        width: string;
        height: number;
        toolbar: {
            show: boolean;
        };
    };
    fill: {
        opacity: number;
    };
    plotOptions: {
        bar: {
            horizontal: boolean;
            columnWidth: string;
            borderRadiusApplication?: string;
            borderRadius: number;
            dataLabels: {
                position: string;
            };
        };
    };
    legend: {
        show: boolean;
        position: string;
    };
    dataLabels: {
        enabled: boolean;
    };
    tooltip: {
        shared: boolean;
        intersect: boolean;
        formatter: (value: string) => string;
    };
    xaxis: {
        labels: {
            show: boolean;
            style: {
                fontFamily: string;
                cssClass: string;
            };
            formatter: (value: string) => string;
        };
        categories: string[];
        axisTicks: {
            show: boolean;
        };
        axisBorder: {
            show: boolean;
        };
    };
    yaxis: {
        labels: {
            show: boolean;
            style: {
                fontFamily: string;
                cssClass: string;
            };
        };
    };
    grid: {
        show: boolean;
        strokeDashArray: number;
        padding: {
            left: number;
            right: number;
            top: number;
        };
    };
}

const Grafic = () => {
    function chartTeste() {
        const options: Options = {
            series: [
                {
                    name: "Expense",
                    data: ["788", "810", "866", "788", "1100", "1200"],
                    color: "#F05252",
                },
            ],
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
                formatter: function (value) {
                    return "R$" + value;
                },
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                        cssClass:
                            "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                    },
                    formatter: function (value) {
                        return "R$" + value;
                    },
                },
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
        };

        if (
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
    }

    useEffect(() => {
        chartTeste();
    }, []);
    return (
        <div className="p-5">
            <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-5 ">
                <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                    <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                            Perdas
                        </dt>
                        <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                            R$5,405 este mês
                        </dd>
                    </dl>
                </div>

                <div className="grid grid-cols-2 py-3">
                    <dl>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                            Despesas
                        </dt>
                        <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
                            R$ -18,230 ano
                        </dd>
                    </dl>
                </div>

                <div id="bar-chart"></div>
            </div>
        </div>
    );
};

export default Grafic;
