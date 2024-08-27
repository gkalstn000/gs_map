# 1. Anaconda 설정
## MacOS
1. Anaconda 설치:

```Bash
코드 복사
wget https://repo.anaconda.com/archive/Anaconda3-2024.06-1-MacOSX-x86_64.sh
sh Anaconda3-2024.06-1-MacOSX-x86_64.sh

# 마지막 초기화 여부 yes
# You can undo this by running `conda init --reverse $SHELL`? [yes|no]
# [no] >>> yes 

source ~/.bashrc
```
2. Conda 환경 생성 및 활성화:
```Bash
conda create -n gs python==3.10
conda activate gs 
pip install -r requirements.txt 
````

## Windows
1. Anaconda 설치:

[Anaconda 다운로드 페이지](https://www.anaconda.com/download/success)에서 최신 버전의 Anaconda를 다운로드하고 설치합니다.

3. Conda 환경 생성 및 활성화:

Anaconda Prompt를 관리자 권한으로 실행한 후 아래 명령어를 입력합니다.
```Bash
conda create -n gs python==3.10
conda activate gs 
pip install -r requirements.txt
```

# 2. 방화벽 설정
## MacOS
1. pfctl 사용하여 방화벽 열기:
2. pf.conf 파일 편집:
```Bash
sudo nano /etc/pf.conf
```
3. 내용 추가
```Bash
pass in proto tcp from any to any port 7885
pass out proto tcp from any to any port 7885 
```
4. pfctl 재시작
```Bash
sudo pfctl -f /etc/pf.conf
sudo pfctl -e 
```

## Windows
1. Windows 방화벽에서 포트 열기:
* 제어판 > 시스템 및 보안 > Windows Defender 방화벽 > 고급 설정으로 이동합니다.
* 왼쪽 메뉴에서 인바운드 규칙을 클릭한 후, 오른쪽에서 새 규칙을 클릭합니다.
* 포트를 선택하고 다음을 클릭합니다.
* TCP를 선택하고 특정 로컬 포트에 7885를 입력한 후 다음을 클릭합니다.
* 연결 허용을 선택하고 다음을 클릭합니다.
* 프로필을 설정한 후 다음을 클릭하고 규칙 이름을 입력한 후 마침을 클릭합니다.
2. 같은 절차로 아웃바운드 규칙도 설정합니다.

# 3. 실행
```Bash
python main.py
```
