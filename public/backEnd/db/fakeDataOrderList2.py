import random
import datetime

def generate_chinese_name():
    last_names = "趙錢孫李周吳鄭王馮陳褚衛蔣沈韓楊朱秦尤許何呂施張孔曹嚴華金魏陶姜"
    first_names = "豫章丙丁吾癸葵軒卿寅士奎斗飛聖東德進林景文玉佩"
    return random.choice(last_names) + random.choice(first_names) + random.choice(first_names)

def generate_email():
    domains = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@aol.com", "@mail.com"]
    prefix = ''.join(random.choices("abcdefghijklmnopqrstuvwxyz", k=7))
    return prefix + random.choice(domains)

def generate_phone():
    return '09' + ''.join(random.choices("0123456789", k=8))

def generate_address():
    streets = ["中正路", "民族路", "民生路", "建國路", "中山路"]
    districts = ["中正區", "萬華區", "松山區", "大安區", "信義區"]
    city = "台北市"
    return city + random.choice(districts) + random.choice(streets) + str(random.randint(1, 300)) + "號"

def generate_datetime(start, end):
    return start + datetime.timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )

def generate_transaction_id(dt):
    return dt.strftime('%Y%m%d%H%M%S')

date_start = datetime.datetime(2024, 7, 1, 0, 0, 0)
date_end = datetime.datetime(2024, 8, 31, 23, 59, 59)
product_prices = {
    1: 350, 2: 699, 3: 499, 4: 699, 5: 420, 6: 799, 7: 590, 8: 590, 9: 590, 10: 630,
    11: 780, 12: 200, 13: 99, 14: 99, 15: 350, 16: 120, 17: 699, 18: 1299, 19: 699,
    20: 360, 21: 120, 22: 60, 23: 36, 24: 70, 25: 35, 26: 45, 27: 1299, 28: 899,
    29: 299, 30: 650, 31: 59000, 32: 18500, 33: 12000, 34: 3980, 35: 6800, 36: 3200,
    37: 32000, 38: 29000, 39: 29000
}
receipt_types = ["二聯式", "三聯式"]
insert_statements = []

for i in range(1, 101):
    orderID = i
    orderExist = random.randint(0, 1)
    orderProductID = random.randint(1, 39)
    productQ = random.randint(1, 10)
    buyerName = generate_chinese_name()
    buyerEmail = generate_email()
    buyerTel = generate_phone()
    buyerAddr = generate_address()
    transportNote = ''.join(random.choices("物流備註可以是空字串", k=random.randint(0, 10)))
    orderDate = generate_datetime(date_start, date_end)
    orderDateString = orderDate.strftime('%Y-%m-%d %H:%M:%S')
    payment = "貨到付款"
    receiptType = random.choice(receipt_types)
    companyTitle = ''.join(random.choices("公司名稱可以空", k=random.randint(0, 10)))
    taxIDNumber = ''.join(random.choices("0123456789", k=8))
    orderStatus = random.choice([0, 1, 2])
    transactionID = generate_transaction_id(orderDate)
    orderAmount = productQ * product_prices[orderProductID]

    sql = (f"INSERT INTO orderlist (orderID, orderExist, orderProductID, productQ, buyerName, buyerEmail, buyerTel, "
           f"buyerAddr, transportNote, orderDate, payment, receiptType, companyTitle, taxIDNumber, orderStatus, transactionID, "
           f"orderAmount) VALUES ({orderID}, {orderExist}, {orderProductID}, {productQ}, '{buyerName}', '{buyerEmail}', "
           f"'{buyerTel}', '{buyerAddr}', '{transportNote}', '{orderDateString}', '{payment}', '{receiptType}', "
           f"'{companyTitle}', '{taxIDNumber}', {orderStatus}, '{transactionID}', {orderAmount});")

    insert_statements.append(sql)

sql_output = "\n".join(insert_statements)
print(sql_output)
