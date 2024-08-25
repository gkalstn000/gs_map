from flask import Flask, render_template
import pandas as pd
import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수 불러오기
load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    # 엑셀 파일 불러오기
    df = pd.read_excel('dataset/test.xlsx')

    # HTML 표로 변환
    table_html = df.to_html(classes='table table-striped', index=False)

    # .env 파일에서 KAKAO_MAP_KEY를 읽어옴
    kakao_map_key = os.getenv('KAKAO_MAP_KEY')

    # HTML 파일로 표와 카카오 맵 키 출력
    return render_template('index.html', table_html=table_html, kakao_map_key=kakao_map_key)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7885, debug=True)
