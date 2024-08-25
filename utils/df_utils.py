import pandas as pd
import numpy as np
from flask import Flask, render_template, request, flash
from pyproj import Proj, Transformer


necessary_columns = ['소재지전체주소', '사업장명', '좌표정보(X)', '좌표정보(Y)']
def extract_necessary_columns(df):
    error_message = None
    missing_columns = check_columns(df, necessary_columns)
    if missing_columns:
        error_message = f"누락된 열이 있습니다: [{', '.join(missing_columns)}]"
        return df, error_message
    df = df[necessary_columns]
    df.dropna(axis=0, how='any', inplace=True)
    df[['좌표정보(X)', '좌표정보(Y)']] = convert_coordinate(df[['좌표정보(X)', '좌표정보(Y)']])

    return df, error_message

def check_columns(df, necessary_columns):
    missing_columns = [col for col in necessary_columns if col not in df.columns]
    return missing_columns

# 중부원점TM 좌표계를 위도와 경도로 변환
def convert_coordinate(coords):
    # 좌표 변환기 초기화
    transformer = Transformer.from_crs("epsg:5174", "epsg:4326", always_xy=True)

    # 좌표 변환 수행
    coords[['좌표정보(X)', '좌표정보(Y)']] = coords.apply(
        lambda row: transformer.transform(row['좌표정보(X)'], row['좌표정보(Y)']),
        axis=1, result_type="expand"
    )

    return coords