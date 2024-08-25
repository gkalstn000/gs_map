function initializeMapMarkers(map, positions) {
    if (positions.length > 0) {
        var firstPosition = positions[0];
        var centerLatLng = new kakao.maps.LatLng(firstPosition['좌표정보(Y)'], firstPosition['좌표정보(X)']);
        map.setCenter(centerLatLng);

        positions.forEach(function(position) {
            var latlng = new kakao.maps.LatLng(position['좌표정보(Y)'], position['좌표정보(X)']);

            var marker = new kakao.maps.Marker({
                map: map,
                position: latlng,
                title: position['사업장명'],
            });

            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="padding:5px;font-size:14px;">' + position['사업장명'] + '</div>'
            });

            kakao.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map, marker);
            });
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        });
    }
}

export { initializeMapMarkers };
