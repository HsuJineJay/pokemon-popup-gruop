import random
import datetime

first_names = ["陳", "林", "王", "張", "李", "周", "朱", "黃", "何", "許"]
last_names = ["大文", "小美", "大華", "小雨", "小花", "小光", "小慧", "小平", "小真", "小強"]
domains = ["example.com", "mail.com", "test.com"]
cities = ["台北市", "新北市", "桃園市", "台中市", "高雄市", "台南市", "基隆市", "新竹市", "苗栗市", "彰化市"]
districts = ["中正區", "板橋區", "中壢區", "北屯區", "左營區", "東區", "信義區", "東區", "竹南鎮", "花壇鄉"]
streets = ["和平西路", "文化路", "中央西路", "松竹路", "博愛路", "東寧路", "信一路", "東大路", "竹南路", "花壇路"]
companies = ["台灣科技", "開心公司", "好運公司", "發財公司", "幸福公司", "", "", "", "", ""]
notes = ["緊急", "慎重", "小心", "易碎", "保密", "勿摔", "", "", "", ""]

def generate_fake_data(num_records):
    sql_statements = []
    start_date = datetime.datetime(2024, 7, 1, 0, 0, 0)
    end_date = datetime.datetime(2024, 8, 31, 23, 59, 59)
    
    for i in range(1, num_records + 1):
        orderID = i
        orderExist = random.randint(0, 1)
        orderProductID = random.randint(1, 39)
        productQ = random.randint(1, 10)
        buyerName = random.choice(first_names) + random.choice(last_names)
        buyerEmail = buyerName[0:3].lower() + "@" + random.choice(domains)
        buyerTel = "09" + "".join([str(random.randint(0, 9)) for _ in range(8)])
        buyerAddr = random.choice(cities) + random.choice(districts) + random.choice(streets) + str(random.randint(1, 10)) + "段"
        transportNote = random.choice(notes)
        orderDate = start_date + (end_date - start_date) * random.random()
        payment = "貨到付款"
        receiptType = random.choice(["二聯式", "三聯式"])
        companyTitle = random.choice(companies)
        taxIDNumber = "".join([str(random.randint(0, 9)) for _ in range(8)])
        orderStatus = random.randint(0, 2)
        
        sql_statements.append(f"({orderID}, {orderExist}, {orderProductID}, {productQ}, '{buyerName}', '{buyerEmail}', '{buyerTel}', '{buyerAddr}', '{transportNote}', '{orderDate}', '{payment}', '{receiptType}', '{companyTitle}', '{taxIDNumber}', {orderStatus})")
    
    return ",\n".join(sql_statements)

num_records = 40  # 這裡可以調整生成的記錄數量
fake_data = generate_fake_data(num_records)

print(f"INSERT INTO orderlist (orderID, orderExist, orderProductID, productQ, buyerName, buyerEmail, buyerTel, buyerAddr, transportNote, orderDate, payment, receiptType, companyTitle, taxIDNumber, orderStatus) VALUES\n{fake_data};")
