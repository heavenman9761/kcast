from models.Model import Model_predict
import datetime
from lib.job_time import job_leak,job_freq
from lib.set_logger.set_logger import logger

def check_system():
    logger.info("Now start checking to see if the program is running properly===")

    try:
        is_missing = Model_predict.check_data(datetime.date.today(),"LEAKLEVEL")
    except Exception as e:
        logger.error('Checking failed with  ==='+str(e))
        job_leak(False)
    else:
        if is_missing:
            logger.warn("Program seems did not running properly. Run it again ===")
            job_leak(True)
        else:
            logger.info("program is running properly")

    try:
        is_missing = Model_predict.check_data(datetime.date.today(),"FREQUENCY")
    except Exception as e:
        logger.error('Program seems did not running properly. Run it again ==='+str(e))
        job_freq(False)
    else:
        if is_missing:
            job_freq(True)
        else:
            logger.info("program is running properly")

