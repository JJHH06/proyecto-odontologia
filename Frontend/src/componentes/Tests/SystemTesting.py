import unittest;
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests

class SeleniumCBT(unittest.TestCase):
    def setUp(self):

        self.username = "123@gmail.com"
        self.authkey = "123"

        self.api_session = requests.Session()
        self.api_session.auth = (self.username,self.authkey)
        self.test_result = None

        caps = {}
        caps['name'] = 'React App Example'
        caps['browserName'] = 'Chrome'
        caps['version'] = '75'
        caps['platform'] = 'Windows'
        caps['record_video'] = 'true'

        try:
            self.driver = webdriver.Remote(
            desired_capabilities=caps,

            command_executor="http://%s:%s@http://198.211.103.50:3000/:80/wd/hub"%(self.username, self.authkey))

        except Exception as e:
            raise e
    def test_CBT(self):
        try:
            self.driver.implicitly_wait(10)

            self.driver.get('https://github.com/JJHH06/proyecto-odontologia')

            search_box = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/input')
            search_box.send_keys('vaporeon')

            result = self.driver.find_element_by_css_selector('#root > div > ul > li > div > p')

            self.assertEqual(result.text, 'vaporeon')

            self.test_result = 'pass'

        except AssertionError as e:
            # log the error message, and set the score to "during tearDown()"
            self.api_session.put('https://crossbrowsertesting.com/api/v3/selenium/' + self.driver.session_id + '/snapshots/' + snapshot_hash,
                data={'description':"AssertionError: " + str(e)})
            self.test_result = 'fail'
            raise

        self.driver.quit()
        # Here we make the api call to set the test's score
        # Pass if it passes, fail if an assertion fails, unset if the test didn't finish
        if self.test_result is not None:
            self.api_session.put('https://crossbrowsertesting.com/api/v3/selenium/' + self.driver.session_id,
                data={'action':'set_score', 'score':self.test_result})

if __name__ == '__main__':
    unittest.main()