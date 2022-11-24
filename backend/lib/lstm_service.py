import time

import schedule
import sys
import os

sys.path.append(os.path.abspath(os.path.dirname(os.getcwd())))

from lib.check_system import check_system
from lib.set_logger.set_logger import logger
from lib.job_time import job_leak, job_freq


if __name__ == '__main__':
    schedule.every().day.at("22:00").do(job_leak, False)
    schedule.every().day.at("22:10").do(job_freq, False)

    schedule.every().day.at("22:30").do(check_system)
    schedule.every().day.at("22:50").do(check_system)

    schedule.every().day.at("23:35").do(check_system)
    schedule.every().day.at("23:50").do(check_system)

    while True:
        logger.info("Waitting to work~~~~")
        schedule.run_pending()
        time.sleep(300)
