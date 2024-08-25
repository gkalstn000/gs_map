from flask import Flask, render_template, request
import pandas as pd
import os
from dotenv import load_dotenv
import json
from werkzeug.utils import secure_filename
from utils.df_utils import extract_necessary_columns

# .env 파일에서 환경 변수 불러오기
load_dotenv()

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    table_html = None
    error_message = None
    kakao_map_key = os.getenv('KAKAO_MAP_KEY')
    positions = []

    if request.method == 'POST':
        if 'file' in request.files:
            file = request.files['file']
            if file and file.filename.endswith('.xlsx'):
                df = pd.read_excel(file)
                df, error_message = extract_necessary_columns(df)
                if not error_message:
                    table_html = df.to_html(classes='table table-striped', index=False)

                    # 필요한 열 추출하여 JSON으로 변환
                    positions = df[['사업장명', '좌표정보(X)', '좌표정보(Y)']].to_dict(orient='records')

    return render_template('index.html',
                           table_html=table_html,
                           error_message=error_message,
                           kakao_map_key=kakao_map_key,
                           positions=json.dumps(positions))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7885, debug=True)
