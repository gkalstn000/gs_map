var drawingFlag = false;
var moveLine;
var clickLine;
var distanceOverlay;
var dots = [];

function initializeDrawLines(map) {
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        var clickPosition = mouseEvent.latLng;

        if (!drawingFlag) {
            drawingFlag = true;
            deleteClickLine();
            deleteDistance();
            deleteCircleDot();

            clickLine = new kakao.maps.Polyline({
                map: map,
                path: [clickPosition],
                strokeWeight: 3,
                strokeColor: '#db4040',
                strokeOpacity: 1,
                strokeStyle: 'solid'
            });

            moveLine = new kakao.maps.Polyline({
                strokeWeight: 3,
                strokeColor: '#db4040',
                strokeOpacity: 0.5,
                strokeStyle: 'solid'
            });

            displayCircleDot(clickPosition, 0, map); // map 전달
        } else {
            var path = clickLine.getPath();
            path.push(clickPosition);
            clickLine.setPath(path);
            var distance = Math.round(clickLine.getLength());
            displayCircleDot(clickPosition, distance, map); // map 전달
        }
    });

    kakao.maps.event.addListener(map, 'mousemove', function(mouseEvent) {
        if (drawingFlag) {
            var mousePosition = mouseEvent.latLng;
            var path = clickLine.getPath();
            var movepath = [path[path.length - 1], mousePosition];
            moveLine.setPath(movepath);
            moveLine.setMap(map);

            var distance = Math.round(clickLine.getLength() + moveLine.getLength()),
                content = '<div class="dotOverlay distanceInfo">총거리 <span class="number">' + distance + '</span>m</div>';

            showDistance(content, mousePosition, map); // map 전달
        }
    });

    kakao.maps.event.addListener(map, 'rightclick', function(mouseEvent) {
        if (drawingFlag) {
            moveLine.setMap(null);
            moveLine = null;
            var path = clickLine.getPath();

            if (path.length > 1) {
                if (dots[dots.length - 1].distance) {
                    dots[dots.length - 1].distance.setMap(null);
                    dots[dots.length - 1].distance = null;
                }
                var distance = Math.round(clickLine.getLength()),
                    content = getTimeHTML(distance);

                showDistance(content, path[path.length - 1], map); // map 전달
            } else {
                deleteClickLine();
                deleteCircleDot();
                deleteDistance();
            }

            drawingFlag = false;
        }
    });
}

function deleteClickLine() {
    if (clickLine) {
        clickLine.setMap(null);
        clickLine = null;
    }
}

function showDistance(content, position, map) { // map 전달
    if (distanceOverlay) {
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
    } else {
        distanceOverlay = new kakao.maps.CustomOverlay({
            map: map,
            content: content,
            position: position,
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 3
        });
    }
}

function deleteDistance() { // 이름 수정 (오타 수정)
    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }
}

function displayCircleDot(position, distance, map) { // map 전달
    var circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1
    });

    circleOverlay.setMap(map);

    if (distance > 0) {
        var distanceOverlay = new kakao.maps.CustomOverlay({
            content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
            position: position,
            yAnchor: 1,
            zIndex: 2
        });

        distanceOverlay.setMap(map);
    }

    dots.push({ circle: circleOverlay, distance: distanceOverlay });
}

function deleteCircleDot() {
    for (var i = 0; i < dots.length; i++) {
        if (dots[i].circle) {
            dots[i].circle.setMap(null);
        }

        if (dots[i].distance) {
            dots[i].distance.setMap(null);
        }
    }

    dots = [];
}

function getTimeHTML(distance) {
    var walkTime = distance / 67 | 0;
    var walkHour = '', walkMin = '';

    if (walkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkTime / 60) + '</span>시간 ';
    }
    walkMin = '<span class="number">' + walkTime % 60 + '</span>분';

    var bicycleTime = distance / 227 | 0;
    var bicycleHour = '', bicycleMin = '';

    if (bicycleTime > 60) {
        bicycleHour = '<span class="number">' + Math.floor(bicycleTime / 60) + '</span>시간 ';
    }
    bicycleMin = '<span class="number">' + bicycleTime % 60 + '</span>분';

    return `<ul class="dotOverlay distanceInfo">
                <li><span class="label">총거리</span><span class="number">${distance}</span>m</li>
                <li><span class="label">도보</span>${walkHour}${walkMin}</li>
                <li><span class="label">자전거</span>${bicycleHour}${bicycleMin}</li>
            </ul>`;
}

export { initializeDrawLines, deleteClickLine, deleteDistance, deleteCircleDot };
