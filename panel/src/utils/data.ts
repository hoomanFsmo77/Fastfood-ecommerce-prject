import {Ref} from "vue";


export const sidebar_items=[
    {
        title:'Dashboard',
        link:{name:'DASHBOARD'},
        icon:'ri:home-2-line',
        hasSub:false
    },
    {
        title:'Users',
        hasSub:true,
        link:{name:'USERS'},
        icon:'ri:account-circle-line',
        sub:[
            {
                title:'user list'  ,
                icon:'ri:user-3-line',
                link:{name:'USERS'},
                hasSub:false
            },
            {
                title:'Create user'  ,
                icon:'ri:user-add-line',
                link:{name:'USERS_CREATE'},
                hasSub:false
            },
        ]
    },
    {
        title:'Products',
        icon:'ri:shopping-bag-2-line',
        hasSub:true,
        link:{name:'PRODUCTS'},
        sub:[
            {
                title:'product list'  ,
                icon:'ri:shopping-bag-2-line',
                link:{name:'PRODUCTS'},
                hasSub:false
            },
            {
                title:'Create product'  ,
                icon:'ri:shopping-cart-2-line',
                link:{name:'PRODUCTS_CREATE'},
                hasSub:false
            },
        ]
    },
    {
        title:'Blogs',
        icon:'ri:book-open-line',
        link:{name:'BLOGS'},
        hasSub:true,
        sub:[
            {
                title:'blog list'  ,
                icon:'ri:book-open-line',
                link:{name:'BLOGS'},
                hasSub:false
            },
            {
                title:'Create blog'  ,
                link:{name:'BLOGS_CREATE'},
                icon:'ri:book-2-line',
                hasSub:false
            },
        ]
    },
    {
        title:'Category',
        icon:'ri:command-line',
        link:{name:'CATEGORIES'},
        hasSub:true,
        sub:[
            {
                title:'category list'  ,
                icon:'ri:command-line',
                link:{name:'CATEGORIES'},
                hasSub:false
            },
            {
                title:'Create category'  ,
                link:{name:'CATEGORIES_CREATE'},
                icon:'ri:folder-add-fill',
                hasSub:false
            },
        ]
    },
    {
        title:'Comments',
        link:{name:'COMMENTS'},
        icon:'ri:message-2-fill',
        hasSub:false
    },
    {
        title:'Orders',
        link:{name:'ORDERS'},
        icon:'ri:money-dollar-circle-line',
        hasSub:false
    },
    {
        title:'Transactions',
        link:{name:'TRANSACTIONS'},
        icon:'ri:shake-hands-line',
        hasSub:false
    },
    {
        title:'Offers',
        link:{name:'OFF'},
        icon:'ri:percent-line',
        hasSub:false
    },
]


export const saleChartSetup=(el:Ref<HTMLElement|null>,data:Ref<any>)=>{
    const {
        $am5,$am5xy, $am5themes_Animated
    }:any=useNuxtApp();

    let root = $am5.Root.new(el.value);


    root.setThemes([
        $am5themes_Animated.new(root)
    ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push($am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,

    }));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", $am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer =$am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    var yRenderer =$am5xy.AxisRendererY.new(root, {strokeOpacity: 0.1,});
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: $am5.p50,
        centerX: $am5.p100,
        paddingRight: 15,
        fill:'#bcc0c6',
        fontFamily:'Poppins',
        fontSize:'0.8rem'
    });

    yRenderer.labels.template.setAll({
        fill:'#bcc0c6',
        fontFamily:'Poppins',
        fontSize:'0.8rem',
        grid:false

    });
    xRenderer.grid.template.setAll({
        location: 1
    })
    let xAxis = chart.xAxes.push($am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "month",
        renderer: xRenderer,
        tooltip: $am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push($am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer:yRenderer,
        numberFormat: "#$"
    }));
    let series = chart.series.push($am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "sale_amount",
        categoryXField: "month",
        tooltip: $am5.Tooltip.new(root, {
            labelText: "{valueY}$",
            fontFamily:'Poppins'
        })
    }));
    series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0 ,
        stroke:'#00bac7',
        fill:'#00bac7',
        strokeWidth: 0.5,
        width: 10,
    });
    yAxis.get("renderer").grid.template.set("forceHidden", true);
    series.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    xAxis.data.setAll(data.value);
    series.data.setAll(data.value);
    series.appear(1000);
    chart.appear(1000, 100);

}


export const visitorChartSetup=(el:Ref<HTMLElement|null>,data:Ref<any>)=>{
    const {
        $am5,$am5xy, $am5themes_Animated
    }:any=useNuxtApp();


    var root = $am5.Root.new(el.value);

    root.setThemes([
        $am5themes_Animated.new(root)
    ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push($am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));


    var cursor = chart.set("cursor", $am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    var xRenderer = $am5xy.AxisRendererX.new(root, {
        minGridDistance: 15
    });
    let yRenderer=$am5xy.AxisRendererY.new(root, {})

    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: $am5.p50,
        centerX: 0,
        fill:'#bcc0c6',
        fontFamily:'Poppins',
        fontSize:'0.8rem'
    });

    yRenderer.labels.template.setAll({
        fill:'#bcc0c6',
        fontFamily:'Poppins',
        fontSize:'0.8rem'
    });

    xRenderer.grid.template.setAll({
        visible: false
    });

    var xAxis = chart.xAxes.push($am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "month",
        renderer: xRenderer,
        tooltip: $am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push($am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer:yRenderer
    }));



    var series = chart.series.push($am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "visitors_amount",
        categoryXField: "month",
        adjustBulletPosition: false,
        tooltip: $am5.Tooltip.new(root, {
            labelText: "{valueY}"
        })
    }));
    series.columns.template.setAll({
        width: 0.5
    });

    series.bullets.push(function() {
        return $am5.Bullet.new(root, {
            locationY: 1,
            sprite: $am5.Circle.new(root, {
                radius: 5,
                fill: series.get("fill")
            })
        })
    })


    xAxis.data.setAll(data.value);
    series.data.setAll(data.value);
    series.appear(1000);
    chart.appear(1000, 100);

}



export const reviewChartSetup=(el:Ref<HTMLElement|null>,data:Ref<any>)=>{
    const {
        $am5,$am5xy, $am5themes_Animated,$am5percent
    }:any=useNuxtApp();
    var root = $am5.Root.new(el.value);

    root.setThemes([
        $am5themes_Animated.new(root)
    ]);


    var chart = root.container.children.push($am5percent.PieChart.new(root, {
        radius: $am5.percent(90),
        innerRadius: $am5.percent(50),
        layout: root.horizontalLayout
    }));


    var series = chart.series.push($am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "value",
        categoryField: "item"
    }));

    const transferData=Object.entries(data.value).map(item=>{
        return {
            item:item[0],
            value:item[1]
        }
    })

    series.data.setAll(transferData)


    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);


    series.slices.template.set("strokeOpacity", 0);
    series.slices.template.set("fillGradient", $am5.RadialGradient.new(root, {
        stops: [{
            brighten: -0.8
        }, {
            brighten: -0.8
        }, {
            brighten: -0.5
        }, {
            brighten: 0
        }, {
            brighten: -0.5
        }]
    }));

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = chart.children.push($am5.Legend.new(root, {
        centerY: $am5.percent(50),
        y: $am5.percent(50),
        layout: root.verticalLayout
    }));
// set value labels align to right
    legend.valueLabels.template.setAll({
        textAlign: "right",
        fill:'#bcc0c6',
        fontFamily:'Poppins',
        fontSize:'0.8rem'
    })
// set width and max width of labels
    legend.labels.template.setAll({
        fill:'#bcc0c6',
        fontFamily:'Poppins',
        fontSize:'0.8rem',
        maxWidth: 140,
        width: 140,
        oversizedBehavior: "wrap"
    });

    legend.data.setAll(series.dataItems);



    series.appear(1000, 100);



}