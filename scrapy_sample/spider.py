
from scrapy.spider import BaseSpider
from scrapy.contrib.spiders import Rule
from scrapy.contrib.spiders.init import InitSpider
from scrapy.http import Request, FormRequest

## Spider���� InitSpider�� �޴´�.
class TestSpider(InitSpider):

    name = "test"
    allowed_domains = ["saramin.co.kr"]
    login_page = "http://mt.local.saramin.co.kr/zf_user/auth/login"
    start_urls = "http://mt.local.saramin.co.kr/zf_user"
  #Rule ��ü�� �̿��� ũ�Ѹ� �Ǵ� ����Ʈ�� ������ ���� �Ѵ�.
    rules = (
        #Rule(SgmlLinkExtractor(allow=r'-\w+.html$'), callback='parse_item', follow=True),
        Rule(SgmlLinkExtractor(allow=("\mt\.local\.aramin\.co\.kr[^\s]*\/*$")), callback='parse_item', follow=True),
    )

  ## initRequest �޼ҵ尡 �� ó�� ���� ��.
    def init_request(self):
      ## �α��� �������� callback ����
        return Request(url=self.login_page, callback=self.login)

  ## FormRequest�� �̿��ؼ� �ش� ���������� submit��û�� ������.
    def login(self, response):
        return FormRequest.from_response(response,
                    formdata={'id': 'com222', 'password': '90909090'},
                    callback=self.check_login_response)

  ## response�� html�� �Ľ��ؼ� �α��� ���θ� �Ǵ� �Ѵ�.
    def check_login_response(self, response):
        //check login success
        if "/zf_user/auth/logout" in response.body:
          ## �α����� �����ϸ� initialized�� ������ �Ľ��� �����Ѵ�.
            return self.initialized()
        else
            return self.error()

    def initialized(self):
        return Request(url=self.start_urls, callback=self.parse_item)

    def parse_item(self, response):
        ## �ߺ�ó���� ���� ������ url�� �ҷ���.
        if self.isFirstLoop :
            self.tempUrls = self.getUrlSet()
            self.isFirstLoop = 0;
        site = "saramin"
        rank = "0"
        title = response.xpath('//title/text()').extract()
        req_url = response.request.url.replace('http://'+host, '', 1)
        res_url = response.url
        s  = re.search("<(!\s*doctype\s*.*?)>", response.body, re.IGNORECASE)
        doctype = s.group(1) if s else ""
        css = response.xpath('//link/@href').extract()
        js = response.xpath('//script/@src').extract()
        layout = response.xpath('//div[@class="debug_layout"]/text()').extract()
        sidebar = response.xpath('//div[@class="debug_side_layout"]/text()').extract()
        emulate = response.xpath('//meta[contains(@content, "IE")]/@content').extract()
        embed_style_cnt = len(response.xpath('//style').extract())
        embed_script_cnt = len(response.xpath('//script').extract()) - len(response.xpath('//script/@src').extract())
        # ȣ��Ʈ�κ��� ������ �ش�.
        ckurl = req_url.replace("http://mt.local.saramin.co.kr", "")
        ckurl = req_url.replace("https://mt.local.saramin.co.kr", "")
        if ckurl.find('?') > -1 :
            ckurl = ckurl.split('?')[0]
        elif len(ckurl.split('/')) > 4 :
            piece = ckurl.split('/')
            ckurl = piece[0]+'/'+piece[1]+'/'+piece[2]+'/'+piece[3]+'/'+piece[4]
                # �ߺ� Ȯ��.
        if ckurl in self.tempUrls:
            print ">>>>>>>>>>>>>>>[DropItem]:" + ckurl
            raise #DropItem("Duplicate url found: %s" % ckurl)
        else :
            req_url = ckurl
            self.tempUrls.add(req_url)
            if len(layout) > 0 :
                layout = layout[-1]
            else :
                layout = ",".join(layout)
            if len(sidebar) > 0 :
                sidebar = sidebar[-1]
            else :
                sidebar = ",".join(sidebar)
            item = SaraminWebItem()
            item["site"] = site
            item["rank"] = rank
            item["title"] = ",".join(title)
            item["req_url"] = req_url
            item["res_url"] = res_url
            item["doctype"] = doctype
            item["css"] = ",".join(css)
            item["js"] = ",".join(js)
            item["layout"] = layout
            item["sidebar"] = sidebar
            item["emulate"] = ",".join(emulate)
            item["embed_style_cnt"] = embed_style_cnt
            item["embed_script_cnt"] = embed_script_cnt
            # print(item);
            yield item