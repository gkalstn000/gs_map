Mac에서 pfctl 사용하기:

pf.conf 파일 편집: 터미널에서 아래 명령어를 입력하여 pf.conf 파일을 엽니다.

```bash
코드 복사
sudo nano /etc/pf.conf
포트 허용 규칙 추가: 파일의 마지막에 아래 내용을 추가하여 7885 포트를 열어줍니다.
```
```python
코드 복사
pass in proto tcp from any to any port 7885
pass out proto tcp from any to any port 7885
```
pfctl 재시작: 설정을 저장하고 pfctl을 재시작합니다.

```bash
#코드 복사
sudo pfctl -f /etc/pf.conf
sudo pfctl -e
```