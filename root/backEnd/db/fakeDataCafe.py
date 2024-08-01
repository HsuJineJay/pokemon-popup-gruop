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

def generate_datetime(start, end):
    return start + datetime.timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )

date_start = datetime.datetime(2024, 7, 1)
date_end = datetime.datetime(2024, 8, 31, 23, 59, 59)
time_options = ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00"]

# Initialize booking sums for each time slot
booking_sums = {time: 0 for time in time_options}
insert_statements = []

def generate_valid_booking():
    while True:
        bookingTimePeriodDate = generate_datetime(date_start, date_end).date().strftime('%Y-%m-%d')
        bookingTimePeriodTime = random.choice(time_options)
        bookingTimePeriod = bookingTimePeriodDate + ' ' + bookingTimePeriodTime
        bookingNumber = random.randint(1, 4)
        
        # Check if adding this booking would exceed the limit
        if booking_sums[bookingTimePeriodTime] + bookingNumber <= 30:
            booking_sums[bookingTimePeriodTime] += bookingNumber
            return bookingTimePeriod, bookingNumber

for i in range(104, 153):
    cafeBookingID = i
    print(i)
    bookingExist = random.randint(0, 1)
    bookingDate = generate_datetime(date_start, date_end).strftime('%Y-%m-%d %H:%M:%S')
    bookingTimePeriod, bookingNumber = generate_valid_booking()
    bookingName = generate_chinese_name()
    bookingEmail = generate_email()
    bookingTel = generate_phone()

    sql = (f"INSERT INTO cafeBooking (cafeBookingID, bookingExist, bookingDate, bookingTimePeriod, bookingNumber, "
           f"bookingName, bookingEmail, bookingTel) VALUES ({cafeBookingID}, {bookingExist}, '{bookingDate}', "
           f"'{bookingTimePeriod}', {bookingNumber}, '{bookingName}', '{bookingEmail}', '{bookingTel}');")
    
    insert_statements.append(sql)

sql_output = "\n".join(insert_statements)
print(sql_output)
