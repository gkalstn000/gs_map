import { initializeMapMarkers } from './mapMarkers.js';
import { initializeDrawLines } from './drawLines.js';
import { initializeDrawCircles, removeCircles } from './drawCircles.js'

document.addEventListener("DOMContentLoaded", function() {
    var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(positions[0]['좌표정보(Y)'], positions[0]['좌표정보(X)']),
        level: 3
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);

    initializeMapMarkers(map, positions);
    initializeDrawLines(map);
    initializeDrawCircles(map);

    // removeCircles 함수를 window 객체에 추가하여 HTML에서 접근 가능하게 설정
    window.removeCircles = removeCircles;
});