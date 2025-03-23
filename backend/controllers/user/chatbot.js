import {
    GoogleGenerativeAI
} from "@google/generative-ai";

import dotenv from "dotenv";
// import filmInfoForAI from "../../middlewares/user/filmInfoForAI.js";
dotenv.config();
const k_f = `AIzaSyDvXUA7HTUrYT`
const k_s = `fRl78PKnySSXQhm_sMZUg`
const key = k_f + k_s;
const genAI = new GoogleGenerativeAI(key);
// const filmInfo = filmInfoForAI()

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `bạn là Lilia, tính cách nhiệt tình thích hỗ trợ bạn bè,là AI hỗ trợ tư vấn của trang web đặt vé xem phim NHTT"
        + "đây là thông tin về phim trên web tôi [
  {
    film_name: 'CÁM',
    release_date: 2024-09-19T17:00:00.000Z,
    film_describe: 'Câu chuyện phim là dị bản kinh dị đẫm máu lấy cảm hứng từ truyện cổ tích nổi tiếng Tấm Cám, nội dung chính của phim xoay quanh Cám - em gái cùng cha khác mẹ của Tấm đồng thời sẽ có nhiều nhân vật và chi tiết sáng tạo, gợi cảm giác vừa lạ vừa quen.',     
    age_limit: 18,
    duration: 122,
    film_type: 1,
    country: 1,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Ma Siêu Quậy',
    release_date: 2024-09-05T17:00:00.000Z,
    film_describe: 'Sau một bi kịch gia đình bất ngờ, ba thế hệ của gia đình Deetz trở về nhà ở Winter River. Vẫn bị ám ảnh bởi Beetlejuice, cuộc sống của Lydia bị đảo lộn khi cô con gái tuổi teen nổi loạn của cô, Astrid, phát hiện ra mô hình bí ẩn của thị trấn trên gác mái và cánh cổng dẫn đến Thế giới bên kia vô tình mở ra. Với những rắc rối đang diễn ra ở cả hai thế giới, chỉ là vấn đề thời gian cho đến khi ai đó gọi tên Beetlejuice ba lần và con quỷ tinh quái quay trở lại để gây ra thương hiệu hỗn loạn của riêng mình.',
    age_limit: 13,
    duration: 111,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Hài Kịch, Giả Tưởng'
  },
  {
    film_name: 'Xuyên Không Cải Mệnh Gia Tộc',
    release_date: 2024-09-05T17:00:00.000Z,
    film_describe: 'Bộ phim hài hành động của Thái Lan về đề tài xuyên không, được đạo diễn bởi “Châu Tinh Trì Thái Lan” - Jaturong Phonboon cùng dàn diễn viên đình đám: Alek Teeradetch, Mint Ranchrawee và March Chutavuth.',
    age_limit: 16,
    duration: 102,
    film_type: 1,
    country: 0,
    categories: 'Hài Kịch, Hành Động, Gia Đình'
  },
  {
    film_name: 'Longlegs: Thảm Kịch Dị Giáo',
    release_date: 2024-09-05T17:00:00.000Z,
    film_describe: 'Theo chân một đặc vụ FBI do Maika Monroe (The Guest) thủ vai. Cô được giao cho một vụ điều tra chưa có lời giải, liên quan tới một kẻ giết người hàng loạt, được biết đến qua cách hắn để lại những dòng chữ mã hóa ở hiện trường vụ án.',
    age_limit: 18,
    duration: 101,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Tội Phạm'
  },
  {
    film_name: 'DAN DA DAN: First Encounter',
    release_date: 2024-09-06T17:00:00.000Z,
    film_describe: 'Momo Ayase là con gái của một dòng họ sở hữu linh lực còn Takakura Ken (biệt danh Okarun), bạn cùng lớp của cô là một Otaku cuồng những điều huyền bí. Sau khi được Momo cứu khỏi lũ bắt nạt, hai người đã bắt đầu trò chuyện với nhau. Momo là người tin vào 
ma quỷ nhưng phủ định người vũ trụ còn Okarun thì ngược lại, cậu tin rằng có người vũ trụ còn ma quỷ thì không. Để chứng minh quan điểm của nhau, cả hai đã cùng tới một bệnh viện được cho là xuất hiện UFO và một đường hầm bỏ hoang bị đồn thổi là có ma ám. Thế rồi, cả hai đã cùng gặp những chuyện phi thường, không cách nào lý giải. Momo đã thức tỉnh linh lực ẩn giấu còn Okarun thì có được sức mạnh nguyền rủa 
để cùng nhau đương đầu với thử thách! Một mối tình định mệnh sẽ bắt đầu sao!? Một câu chuyện thanh xuân với những trận chiến kỳ ảo sẽ bắt đầu!',
    age_limit: 10,
    duration: 83,
    film_type: 1,
    country: 0,
    categories: 'Hài Kịch, Phiêu Lưu, Hoạt Hình, Lãng Mạng'
  },
  {
    film_name: 'Không Nói Điều Dữ',
    release_date: 2024-09-12T17:00:00.000Z,
    film_describe: 'Một gia đình người Mỹ được mời đến nghỉ cuối tuần tại khu đất nông thôn bình dị của một gia đình người Anh thiện lành mà họ kết bạn trong kỳ nghỉ, câu chuyện bắt đầu khi kỳ nghỉ trong này mơ sớm biến thành một cơn ác mộng tâm lý kinh hoàng.',
    age_limit: 18,
    duration: 109,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Quỷ Án',
    release_date: 2024-09-12T17:00:00.000Z,
    film_describe: 'Khi Dani bị sát hại dã man tại ngôi nhà nông thôn hẻo lánh mà cô và chồng Ted đang sửa sang, mọi nghi ngờ đổ dồn lên 
một bệnh nhân đến từ viện tâm thần địa phương, nơi Ted là bác sĩ. Tuy nhiên nghi phạm được phát hiện đã chết. Một năm sau, Darcy, em gái 
mù của Dani, một nhà ngoại cảm tự xưng mang theo những món đồ nguy hiểm nhất từ bộ sưu tập bị nguyền rủa của mình đến nhà Ted để tìm ra chân tướng cái chết của chị gái.',
    age_limit: 16,
    duration: 98,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Bí Ẩn'
  },
  {
    film_name: 'Báo Thủ Đi Tìm Chủ',
    release_date: 2024-09-12T17:00:00.000Z,
    film_describe: 'Gracie, một cô chó kiêu ngạo, và Pedro, một chú mèo hoang dã, là hai "kẻ thù không đội trời chung" trong cùng một nhà. Cuộc cãi vã của chúng khiến cả gia đình gặp rắc rối khi chuyển nhà, và hai "boss" này vô tình lạc mất nhau. Hành trình tìm về nhà của Gracie và Pedro đầy hài hước và bất ngờ. Từ những thành phố xa lạ đến những cuộc gặp gỡ kỳ lạ, hai "kẻ thù" buộc phải hợp tác để vượt qua 
khó khăn. Trong khi đó, các thành viên trong gia đình cũng không ngừng tìm kiếm chúng.',
    age_limit: 5,
    duration: 88,
    film_type: 1,
    country: 0,
    categories: 'Hài Kịch, Phiêu Lưu, Hoạt Hình, Gia Đình'
  },
  {
    film_name: 'Báo Thù',
    release_date: 2024-09-12T17:00:00.000Z,
    film_describe: 'Soulmates Eric and Shelly are brutally murdered when the demons of her dark past catch up with them. Given the chance to save his true love by sacrificing himself, Eric sets out to seek merciless revenge on their killers, traversing the worlds of the living and the dead to put the wrong things right.',
    age_limit: 18,
    duration: 110,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Hành Động, Giả Tưởng'
  },
  {
    film_name: 'Tìm Kiếm Tài Năng Âm Phủ',
    release_date: 2024-09-12T17:00:00.000Z,
    film_describe: 'Sinh ra là một con người đã đủ khó khăn, nhưng hóa ra trở thành một hồn ma cũng không hề dễ dàng. Newbie - một hồn ma mới, kinh hoàng nhận ra rằng cô chỉ còn 28 ngày nữa cho đến khi linh hồn của cô biến mất khỏi thế giới. Makoto, một “chuyên viên ám quẻ” tiếp cận Newbie với lời đề nghị kết hợp cùng ngôi sao ma Catherine để dựng lại câu chuyện kinh dị huyền thoại về khách sạn Wang Lai. Nếu câu chuyện đủ sức hù dọa người sống thì cái tên của cô sẽ trở thành huyền thoại và linh hồn của Newbie sẽ tiếp tục được sống dưới địa ngục mà không bị tan biến vĩnh viễn.',
    age_limit: 16,
    duration: 110,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Hài Kịch'
  },
  {
    film_name: 'Anh Trai Vượt Mọi Tam Tai',
    release_date: 2024-09-12T17:00:00.000Z,
    film_describe: 'Cho Su Gwang là một thanh tra cực kỳ nóng tính, dù có tỷ lệ bắt giữ tội phạm ấn tượng nhưng anh luôn gặp khó khăn trong việc kiểm soát cơn giận của mình. Vì liên tục tấn công các nghi phạm, Cho Su Gwang bị chuyển đến đảo Jeju. Tại đây, vị thanh tra nhận 
nhiệm vụ truy bắt kẻ lừa đảo giỏi nhất Hàn Quốc - Kim In Hae với 7 tiền án, nổi tiếng thông minh và có khả năng “thiên biến vạn hoá” để ngụy trang hoàn hảo mọi nhân dạng. Cùng lúc đó, Kim In Hae bất ngờ dính vào vụ án mạng nghiêm trọng có liên quan đến tên trùm xã hội đen đang nhăm nhe “thôn tính” đảo Jeju. Trước tình hình nguy cấp phải “giải cứu” hòn đảo Jeju và triệt phá đường dây nguy hiểm của tên trùm xã hội đen, thanh tra Cho Su Gwang bất đắc dĩ phải hợp tác cùng nghi phạm Kim In Hae, tận dụng triệt để các kỹ năng từ phá án đến lừa đảo trên hành trình rượt đuổi vừa gay cấn vừa hài hước để có thể hoàn thành nhiệm vụ cam go.',
    age_limit: 16,
    duration: 110,
    film_type: 1,
    country: 0,
    categories: 'Hài Kịch, Hành Động, Phiêu Lưu'
  },
  {
    film_name: 'BTS: Hành Trình Solo | Jung Kook: I Am Still',
    release_date: 2024-09-17T17:00:00.000Z,
    film_describe: '“Tôi chỉ đi theo kim chỉ nam của riêng mình.” BTS Jung Kook - thành viên của nhóm nhạc đạt danh hiệu "Nghệ sĩ nhạc Pop thế kỷ 21" - đã trở thành ngôi sao toàn cầu với solo single đầu tay "Seven" ra mắt vào 07/2023. Liên tục đạt được thành công vang dội, 
Jung Kook trở thành nghệ sĩ solo châu Á đầu tiên ẵm gọn vị trí số 1 với bài hát debut trên ba bảng xếp hạng toàn cầu lớn - Billboard HOT 
100, Global 200 và Global 200 trừ Mỹ - ngay sau khi phát hành. Các đĩa đơn "Seven", "3D" và "Standing Next to You" của anh đều lọt vào top 10 của Billboard HOT 100, giúp anh trở thành nghệ sĩ solo K-pop duy nhất đạt được thành tích này. Album "GOLDEN" cũng đã tạo nên lịch sử khi trụ vững trên Billboard 200 24 tuần liên tiếp. Qua các cuộc phỏng vấn độc quyền, cảnh quay hậu trường chưa từng công bố, cùng với các sân khấu đầy phấn khích, bộ phim giới thiệu hành trình kéo dài tám tháng của Jung Kook, ghi lại sự cống hiến và trưởng thành không ngừng nghỉ của anh út. Hãy cùng Jung Kook chia sẻ về sự nổi tiếng đáng kinh ngạc và những khoảnh khắc chân thành với ARMY trên toàn thế giới trong JUNG KOOK: I AM STILL.',
    age_limit: 5,
    duration: 94,
    film_type: 1,
    country: 0,
    categories: 'Âm Nhạc, Tiểu Sử'
  },
  {
    film_name: 'Look Back: Liệu Ta Có Dám Nhìn Lại?',
    release_date: 2024-09-19T17:00:00.000Z,
    film_describe: 'Đây là anime được chuyển thể từ one-shot nổi tiếng của tác giả Chainsaw Man - Tatsuki Fujimoto. Look Back xoay quanh 
nhân vật Fujino tự tin thái quá, trong khi Kyomoto lại sống khép kín, cả hai dường như không thể khác biệt hơn, nhưng tình yêu mãnh liệt 
dành cho manga đã trở thành sợi dây duy nhất kết nối họ. Thế nhưng, một ngày nọ, một biến cố đã xảy ra, khiến thế giới của họ hoàn toàn thay đổi… Look Back: Liệu Ta Có Dám Nhìn Lại? là một câu chuyện trưởng thành đầy xúc động và day dứt.',
    age_limit: 13,
    duration: 58,
    film_type: 1,
    country: 0,
    categories: 'Hoạt Hình, Drama'
  },
  {
    film_name: 'Minh Hôn',
    release_date: 2024-09-26T17:00:00.000Z,
    film_describe: 'Baridegi: The Abandoned Girl (Minh Hôn) diễn ra sau khi mất vợ và con gái, Won Go Myeong – một pháp sư đầy hận thù, đãphát hiện ra gã tài phiệt đứng sau cái chết gia đình ông. Với ma thuật đen, Go Myeong đã gọi hồn, triệu vong vạch trần sự thật và khiến 
gã tài phiệt đền mạng. Thế nhưng, mọi chuyện chỉ là khởi đầu….',
    age_limit: 18,
    duration: 92,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Bí Ẩn'
  },
  {
    film_name: 'Cậu Bé Cá Heo',
    release_date: 2024-09-26T17:00:00.000Z,
    film_describe: 'Cậu Bé Cá Heo là một bộ phim hoạt hình của Thổ Nhĩ Kỳ, được thực hiện bởi đạo diễn Mohammad Kheirandish. Câu chuyện kể về một cậu bé loài người được cá heo nuôi lớn, nội dung chính của phim sẽ xoay quanh hành trình khám phá bản thân và tìm kiếm người mẹ 
thân thương của cậu bé cá heo.',
    age_limit: 5,
    duration: 85,
    film_type: 1,
    country: 0,
    categories: 'Hài Kịch, Phiêu Lưu, Hoạt Hình, Giả Tưởng'
  },
  {
    film_name: 'Hắn: Ác Mộng Quỷ Dữ',
    release_date: 2024-09-26T17:00:00.000Z,
    film_describe: 'This Man/ Hắn: Ác Mộng Quỷ Dữ lấy bối cảnh vùng nông thôn Nhật Bản, khi hàng loạt cái chết kì lạ xảy ra. Tất cả các nạn nhân đều có điểm chung: Trước khi chết họ gặp một người đàn ông lạ mặt trong mơ. Nữ chính Yasaka cũng không ngoại lệ. Trước khi bi kịch xảy ra, cô đang sống hạnh phúc bên chồng con. Khi ngày càng nhiều người thân qua đời, cô bắt đầu sợ ngủ. Cuối cùng, cô nhìn thấy “người đàn ông” trong giấc mơ của mình. Cái kết tồi tệ nhất sắp xảy ra…',
    age_limit: 13,
    duration: 89,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Đố Anh Còng Được Tôi',
    release_date: 2024-09-26T17:00:00.000Z,
    film_describe: 'Phim ghi lại hành trình thực thi công lý của thanh tra cảnh sát Seo Do Cheol (Hwang Jung Min) đối với những kẻ lạm dụng quyền lực trong xã hội, từ đó thành công chinh phục và thoả mãn khán giả bởi màn trừng trị thích đáng cho kẻ thủ ác.',
    age_limit: 18,
    duration: 118,
    film_type: 1,
    country: 0,
    categories: 'Hài Kịch, Hành Động, Tội Phạm'
  },
  {
    film_name: 'Nơi Tình Yêu Kết Thúc',
    release_date: 2024-09-26T17:00:00.000Z,
    film_describe: 'Câu chuyện bắt đầu khi Lily gặp được Ryle nảy sinh tình cảm và tình cũ của cô xuất hiện. Những rạn nứt, bạo hành xuất hiện trong mối quan hệ nhưng Lily vẫn chấp nhận và níu giữ nó. Điều gì đã khiến cô chấp nhận một mối quan hệ này?',
    age_limit: 16,
    duration: 130,
    film_type: 1,
    country: 0,
    categories: 'Lãng Mạng, Drama'
  },
  {
    film_name: 'Kết Nối Tử Thần',
    release_date: 2024-09-26T17:00:00.000Z,
    film_describe: 'Kết Nối Tử Thần kể về Hana - một game thủ chuyên nghiệp với chứng sợ không gian rộng. Cô nhận được 1 thiết bị giúp cải thiện trò chơi của mình nhưng có vẻ nó đang dần chiếm lấy tâm trí cô. Liệu những điều đáng sợ Hana gặp phải chỉ xuất hiện trong thế giới ảo?',
    age_limit: 16,
    duration: 89,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Khoa Học Viễn Tưởng'
  },
  {
    film_name: 'Transformers Một',
    release_date: 2024-09-26T17:00:00.000Z,
    film_describe: 'Câu chuyện về nguồn gốc chưa từng được hé lộ của Optimus Prime và Megatron. Hai nhân vật được biết đến như những kẻ thù truyền kiếp, nhưng cũng từng là những người anh em gắn bó, đã thay đổi vận mệnh của Cybertron mãi mãi.',
    age_limit: 13,
    duration: 120,
    film_type: 1,
    country: 0,
    categories: 'Hành Động, Phiêu Lưu, Hoạt Hình, Gia Đình, Khoa Học Viễn Tưởng'
  },
  {
    film_name: 'Joker 2: Điên Có Đôi',
    release_date: 2024-10-03T17:00:00.000Z,
    film_describe: 'Joker 2: Điên Có Đôi đưa Arthur Fleck đến trại tâm thần Arkham trong khi chờ xét xử cho những tội ác của hắn với tư cách là Joker. Trong lúc vật lộn với hai bản ngã của mình, Arthur không chỉ tìm thấy tình yêu đích thực mà còn khám phá ra âm nhạc luôn tồn tại trong con người hắn.',
    age_limit: 18,
    duration: 138,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị, Tội Phạm, Drama'
  },
  {
    film_name: 'Gã Trùm Vô Danh',
    release_date: 2024-10-03T17:00:00.000Z,
    film_describe: 'Gã giang hồ mới nổi Kwon Sang-Gon trở thành một ông trùm băng đảng hùng mạnh. Tưởng chừng gã sẽ được sống quyền lực đứng trên xã hội, nhưng sự thật phũ phàng trong thế giới giang hồ khiến cuộc đời của gã trở thành địa ngục của âm mưu và phản bội.',      
    age_limit: 18,
    duration: 110,
    film_type: 1,
    country: 0,
    categories: 'Hành Động, Tội Phạm, Drama'
  },
  {
    film_name: 'Phép Màu Giữa Đêm Đông',
    release_date: 2024-10-03T17:00:00.000Z,
    film_describe: 'Giữa bom đạn chiến tranh năm 1942, cô bé Sara buộc phải chạy trốn và lạc mất gia đình trong một lần truy quét cộng đồng Do Thái. Nơi lằn ranh sinh tử, người đã bất chấp hiểm nguy để đưa tay về phía Sara là Julien, cậu bạn cùng lớp với một bên chân tật nguyền, người mà Sara chưa từng nhớ tên. Và như thế, trong những tháng ngày sự thù ghét lên ngôi, tấm lòng tử tế đẹp đẽ của Julien đã trở thành phép màu giữa đêm đông lạnh giá, soi sáng cuộc đời tăm tối của cô bé.',
    age_limit: 13,
    duration: 121,
    film_type: 1,
    country: 0,
    categories: 'Gia Đình, Drama, Lịch Sử, Chiến Tranh'
  },
  {
    film_name: 'Kumanthong: Chiêu Hồn Vong Nhi',
    release_date: 2024-10-03T17:00:00.000Z,
    film_describe: 'Kumanthong xoay quanh câu chuyện ám ảnh của một người mẹ tên Sarah trước cái chết của con trai. Cô tìm đến vùng đất tâm linh Thái Lan, khẩn cần một thầy tu nổi tiếng sử dụng tro cốt đứa bé để tạo nên bức tượng Kumanthong. Bức tượng làm sống lại tình mẫu 
tử nhưng triệu hồi những oan hồn ngạ quỷ đến đoạt xác cả gia đình Sarah.',
    age_limit: 18,
    duration: 101,
    film_type: 1,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Mộ Đom Đóm',
    release_date: 2024-10-03T17:00:00.000Z,
    film_describe: 'Bộ phim được đặt trong bối cảnh giai đoạn cuối chiến tranh thế giới thứ 2 ở Nhật, kể về câu chuyện cảm động về tình anh em của hai đứa trẻ mồ côi là Seita và Setsuko. Hai anh em mất mẹ trong một trận bom dữ dội của không quân Mỹ khi cha của chúng đang chiến đấu cho Hải quân Nhật. Hai đứa bé phải vật lộn giữa nạn đói, giữa sự thờ ơ của những người xung quanh (trong đó có cả người cô họ của mình)... Bi kịch thấm đẫm nước mắt.',
    age_limit: 5,
    duration: 89,
    film_type: 1,
    country: 0,
    categories: 'Hoạt Hình, Drama, Chiến Tranh'
  },
  {
    film_name: 'Hẹn Hò Với Sát Nhân',
    release_date: 2024-10-03T17:00:00.000Z,
    film_describe: 'Cheryl Bradshaw (Anna Kendrick thủ vai) tham gia chương trình truyền hình về hẹn hò - The Dating Game với khát khao được nổi tiếng. Tại đây, cô nàng đã gặp gỡ Rodney Alcala - tên sát nhân đội lốt một nhiếp ảnh gia lãng tử và đối đáp cực kỳ hài hước, thông minh trong chương trình hẹn hò. Quyết định kết đôi cùng Rodney Alcala, trong quá trình hẹn hò, Cheryl Bradshaw dần khám phá ra hàng loạt bí mật gây sốc được che giấu khéo léo bởi cái lốt người đàn ông hoàn hảo: đội lốt một gã sát nhân, kẻ biến thái đã chủ mưu rất nhiều vụ hiếp dâm và giết người man rợ.',
    age_limit: 16,
    duration: 95,
    film_type: 1,
    country: 0,
    categories: 'Tội Phạm, Bí Ẩn, Drama'
  },
  {
    film_name: 'Khi Bầu Trời Gặp Biển Cả Ở Giữa Là Chúng Ta',
    release_date: 2024-10-03T17:00:00.000Z,
    film_describe: 'Một ngày nọ, cô gái trẻ tên Momo (Hibiki Kitazawa) tình cờ gặp Todo (Ayumu Nakajima), một người đàn ông 40 tuổi trong quán ăn. Mối quan hệ của họ bắt đầu chớm nở sau buổi tối đầy lãng mạn. Cả hai cùng nắm tay trải qua một hành trình kỳ lạ chất chứa nhiều nỗi buồn. Mỗi người đều có một quá khứ đau thương, chạy trốn khỏi thế giới để hướng đến nơi vô định.',
    age_limit: 16,
    duration: 99,
    film_type: 1,
    country: 0,
    categories: 'Lãng Mạng, Drama'
  },
  {
    film_name: 'Nhất Quỷ Nhì Ma, Thứ Ba Takagi: Trêu Rồi Yêu',
    release_date: 2024-10-10T17:00:00.000Z,
    film_describe: 'Bản điện ảnh từ loạt truyện manga cùng tên, vốn gây ấn tượng với độc giả về những trò nghịch ngợm tuổi học trò của Takagi và cậu bạn Nishikita. Lấy bối cảnh 10 năm sau khi cả hai đã trưởng thành, bộ đôi Takagi - Nishikata sẽ có màn thả thính cực ngọt cùng lời tỏ tình vụng dại hứa hẹn làm xiêu lòng khán giả ngay trên màn ảnh rộng.',
    age_limit: 12,
    duration: 119,
    film_type: 2,
    country: 0,
    categories: 'Hài Kịch, Lãng Mạng'
  },
  {
    film_name: 'Domino: Lối Thoát Cuối Cùng',
    release_date: 2024-10-10T17:00:00.000Z,
    film_describe: 'Thuận Nguyễn rơi vào âm mưu của thế lực ngầm và lối thoát cuối cùng để trốn chạy sẽ là gì?',
    age_limit: 16,
    duration: 110,
    film_type: 2,
    country: 1,
    categories: 'Kinh Dị, Tội Phạm, Drama'
  },
  {
    film_name: 'Ai Oán Trong Vườn Xuân',
    release_date: 2024-10-10T17:00:00.000Z,
    film_describe: 'Ai Oán Trong Vườn Xuân là bộ phim kinh dị đến từ NSX của The Medium. Phim xoay quanh So-hee, người đã mất đi gia đình hạnh phúc của mình vì cái chết đột ngột của chồng, và trải qua những điều kỳ lạ, rùng rợn sau khi đến thăm Neulbom Garden, một ngôi biệt thự nông thôn bí ẩn do chồng cô để lại.',
    age_limit: 12,
    duration: 91,
    film_type: 2,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Robot Hoang Dã',
    release_date: 2024-10-10T17:00:00.000Z,
    film_describe: 'Sau một vụ đắm tàu, robot thông minh tên Roz bị mắc kẹt trên một hòn đảo hoang. Để sống sót trong môi trường khắc nghiệt, Roz gắn kết với các loài động vật trên đảo và chăm sóc một chú ngỗng con mồ côi.',
    age_limit: 5,
    duration: 102,
    film_type: 2,
    country: 0,
    categories: 'Hoạt Hình, Gia Đình, Khoa Học Viễn Tưởng'
  },
  {
    film_name: 'Fubao Bảo Bối Của Ông',
    release_date: 2024-10-10T17:00:00.000Z,
    film_describe: 'Nhân vật chính trong bộ phim Fubao Bảo Bối Của Ông là hai người chăm sóc chính Fubao trong thời gian chú gấu này ở Hàn Quốc, đặc biệt là giai đoạn chuẩn bị và chia tay để Fubao về Trung Quốc. Song Young Kwan và Kang Cheol Won là hai người trực tiếp chăm 
sóc Fubao từ khi mới chào đời đến lúc chia tay xứ sở kim chi.',
    age_limit: 10,
    duration: 95,
    film_type: 2,
    country: 0,
    categories: 'Hoạt Hình, Tiểu Sử'
  },
  {
    film_name: 'Bocchi The Rock! Recap Part 1',
    release_date: 2024-10-10T17:00:00.000Z,
    film_describe: 'Không chỉ là âm nhạc, Bocchi The Rock Part 1 còn là câu chuyện về tình bạn, ước mơ và những hoài bão của các bạn trẻ 
về một thanh xuân đáng nhớ!!',
    age_limit: 5,
    duration: 90,
    film_type: 2,
    country: 0,
    categories: 'Hài Kịch, Hoạt Hình, Âm Nhạc'
  },
  {
    film_name: 'Tee Yod: Quỷ Ăn Tạng 2',
    release_date: 2024-10-17T17:00:00.000Z,
    film_describe: 'Phần 2 Tee Yod: Quỷ Ăn Tạng hứa hẹn sẽ mang đến cơn gió sởn gai óc gấp đôi năm ngoái cho các khán giả mùa Halloween này!',
    age_limit: 18,
    duration: 120,
    film_type: 2,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'CƯỜI 2',
    release_date: 2024-10-17T17:00:00.000Z,
    film_describe: 'CƯỜI 2 ra mắt tại rạp Việt vào 18.10.2024',
    age_limit: 16,
    duration: 120,
    film_type: 2,
    country: 0,
    categories: 'Kinh Dị, Phiêu Lưu, Bí Ẩn'
  },
  {
    film_name: 'Tín Hiệu Cầu Cứu',
    release_date: 2024-10-17T17:00:00.000Z,
    film_describe: 'Tín Hiệu Cầu Cứu theo chân cô phục vụ cocktail Frida (do Naomi Ackie thủ vai) đã phải lòng tỷ phú công nghệ tên Slater King (Channing Tatum thủ vai) và theo chân anh ta tới một hòn đảo thiên đường, với rất nhiều thú vui xa xỉ. Đời không như là mơ bởi hòn đảo thiên đường này lại là nơi dễ đến nhưng khó đi. Tỷ phú Slater King được nhiều người ngưỡng mộ lại đang che giấu một bí mật khủng khiếp. Khi bức màn bí ẩn càng được vén lên thì Frida càng gặp nhiều rắc rối, và một cuộc thanh trừng đẫm máu đã xảy ra tại hòn đảo thiên đường. Số phận của Frida sẽ đi về đâu?',
    age_limit: 12,
    duration: 110,
    film_type: 2,
    country: 0,
    categories: 'Hài Kịch, Tội Phạm, Phiêu Lưu, Bí Ẩn, Drama'
  },
  {
    film_name: 'Cô Dâu Hào Môn',
    release_date: 2024-10-17T17:00:00.000Z,
    film_describe: 'Cô Dâu Hào Môn xoay quanh câu chuyện làm dâu nhà giàu tại Việt Nam',
    age_limit: 10,
    duration: 128,
    film_type: 2,
    country: 1,
    categories: 'Drama'
  },
  {
    film_name: 'Kan Kaung',
    release_date: 2024-10-17T17:00:00.000Z,
    film_describe: 'Phim của Myanma, do Win Lwin Htet làm đạo diễn. Bộ phim đạt 3 giải thưởng danh giá tại SEA International Film Festival 2024 sẽ mang đến cho khán giả một câu chuyện đáng yêu về một thầy tu và một chú chó cùng song hành với nhau vượt qua những vui buồn, ganh ghét của cuộc sống xung quanh, cùng nhau tìm đến hạnh phúc của cuộc đời.',
    age_limit: 12,
    duration: 122,
    film_type: 2,
    country: 0,
    categories: 'Drama'
  },
  {
    film_name: 'Venom: Kèo Cuối',
    release_date: 2024-10-24T17:00:00.000Z,
    film_describe: 'Tom Hardy sẽ tái xuất trong bom tấn Venom: The Last Dance (Venom: Kèo Cuối) và phải đối mặt với kẻ thù lớn nhất từ trước đến nay - toàn bộ chủng tộc Symbiote.',
    age_limit: 16,
    duration: 118,
    film_type: 2,
    country: 0,
    categories: 'Hành Động, Phiêu Lưu, Khoa Học Viễn Tưởng'
  },
  {
    film_name: 'Ác Quỷ Truy Hồn',
    release_date: 2024-10-24T17:00:00.000Z,
    film_describe: 'Sau một tai nạn, cô gái trẻ Retno mất mẹ, trong khi cha cô rơi vào tình trạng hôn mê. Cô cùng chị gái mình quyết định đưa cha về chăm sóc, nhưng quãng thời gian này trở thành địa ngục với cả gia đình khi những sự kiện ghê rợn liên tiếp xảy ra. Cùng lúc đó, sự xuất hiện của người con trai ngoài giá thú của cha cô châm ngòi cho cuộc chiến tranh giành khoản thừa kế, đồng thời mở ra những bí 
ẩn kinh hoàng trong quá khứ.',
    age_limit: 16,
    duration: 102,
    film_type: 2,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Kẻ Trộm Mặt Trăng 4',
    release_date: 2024-07-04T17:00:00.000Z,
    film_describe: 'Gru phải đối mặt với kẻ thù mới là Maxime Le Mal và Valentina đang lên kế hoạch trả thù anh, buộc gia đình anh phải lẩn trốn đi nơi khác. Bên cạnh việc đấu tranh bảo vệ gia đình, Gru đồng thời còn phải tìm ra điểm chung với thành viên mới nhất trong nhà 
đó là Gru Jr.',
    age_limit: 5,
    duration: 94,
    film_type: 0,
    country: 0,
    categories: 'Hài Kịch, Phiêu Lưu, Hoạt Hình, Gia Đình'
  },
  {
    film_name: 'Nhà Chứa Quỷ',
    release_date: 2024-07-04T17:00:00.000Z,
    film_describe: 'Tầng 4 tại tòa nhà nọ đã bị ngọn lửa "nuốt chửng" và bỏ hoang từ lâu. Tuy nhiên, những lời đồn về hồn ma váy đỏ cùng 
những cái chết kinh hoàng tại đây liên tục khiến cư dân sống trong cảnh khiếp sợ tột cùng.',
    age_limit: 18,
    duration: 83,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Lốc Xoáy Tử Thần',
    release_date: 2024-07-11T17:00:00.000Z,
    film_describe: 'Kate Cooper, một nhà săn bão từng trải qua cơn lốc xoáy thời đại học hiện tại đang làm nhà nghiên cứu đặc điểm, hiện 
tượng của những cơn bão thông qua màn hình tại thành phố New York. Cô được Javi - một người bạn cũ, mời đến một vùng đồng bằng để thử nghiệm hệ thống theo dõi mới mang tính đột phá. Tại đó, cô tình cờ gặp Tyler Owens - một ngôi sao truyền thông mạng xã hội đầy sức quyến rũ, nổi tiếng với việc đăng tải những chuyến phiêu lưu săn bão nghẹt thở cùng với đoàn nhân viên ồn ào, thích thú với những sự nguy hiểm. Khi mùa bão trở nên khắc nghiệt hơn, những hiện tượng kỳ lạ chưa từng thấy trước đây dần được hé lộ. Kate, Tyler và đội nhóm của họ thấy mình bị cuốn vào hệ thống những cơn bão khó lường hội tụ tại trung tâm Oklahoma, tại đây, họ sẽ phải đối mặt với những thử thách chưa từng 
có để có thể sống sót.',
    age_limit: 13,
    duration: 123,
    film_type: 0,
    country: 0,
    categories: 'Hành Động, Phiêu Lưu'
  },
  {
    film_name: 'Ôi Ma Ơi: Hồi Kết',
    release_date: 2024-07-11T17:00:00.000Z,
    film_describe: 'Ôi Ma Ơi: Hồi Kết là phần thứ 10 trong toàn loạt phim, khép lại hành trình gần hai thập kỷ chinh phục khán giả xứ Chùa Vàng. Bộ phim theo chân hành trình “bắt ma” đầy bí ẩn của hai chị em Panda, Pancake tại ngôi làng Sapayod đầy rẫy những sự việc kỳ quái. Cũng ở nơi đây, họ bắt gặp một linh hồn của cô gái ma quái mang tên Dokyaa, người ám ảnh và khiến dân làng ngày ngày sợ hãi. Liệu còn thách thức nào đang chờ đợi biệt đội trừ ma “trời ơi đất hỡi” này?',
    age_limit: 18,
    duration: 109,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Hài Kịch'
  },
  {
    film_name: 'Ác Linh Trong Xác Mẹ',
    release_date: 2024-07-11T17:00:00.000Z,
    film_describe: 'Sau khi liều mạng thực hiện nghi thức cấm là thiết lập giao ước với quỷ để công việc kinh doanh phát triển, bà mẹ đơn thân sau một lần phạm phải đại kỵ đã gây họa và khiến cả gia đình bị ám bởi một thế lực tâm linh vô đối. Từ đây hàng loạt bi kịch xảy ra khiến tất cả những thành viên trong gia đình gặp phải tai ương và đỉnh điểm là lúc bà mẹ bị quỷ đoạt hồn. Liệu thầy mo có trục xuất được ác linh trong xác mẹ và hóa giải nghiệp chướng?',
    age_limit: 18,
    duration: 93,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Drama'
  },
  {
    film_name: 'Tín Hiệu Vũ Trụ',
    release_date: 2024-07-11T17:00:00.000Z,
    film_describe: 'Một người sắp hết oxy dự trữ, người còn lại bị chấn thương một bên chân, cả hai sẽ sinh tồn ra sao trên hành tinh xa 
lạ với vô số sinh vật kỳ dị?',
    age_limit: 13,
    duration: 87,
    film_type: 0,
    country: 0,
    categories: 'Hài Kịch, Khoa Học Viễn Tưởng, Lãng Mạng'
  },
  {
    film_name: 'Xin Chào Jadoo: Đại Dương Diệu Kỳ\t',
    release_date: 2024-07-18T17:00:00.000Z,
    film_describe: 'Trong phiên bản điện ảnh lần này, Xin chào Jadoo tiếp tục đưa khán giả vào câu chuyện phiêu lưu độc đáo của cô bé Jadoo, lần này là hành trình khám phá thế giới đại dương kỳ thú. Loạt truyện cổ tích quen thuộc về biển cả sẽ được kể lại qua những câu chuyện siêu hài hước, thú vị của đại gia đình Choi và những người bạn của Jadoo.',
    age_limit: 5,
    duration: 79,
    film_type: 0,
    country: 0,
    categories: 'Hoạt Hình'
  },
  {
    film_name: 'Dự Án Mật: Thảm Hoạ Trên Cầu',
    release_date: 2024-07-18T17:00:00.000Z,
    film_describe: 'Project Silence là câu chuyện về những người bị mắc kẹt trên cây cầu Sân bay đang sụp đổ trong sương mù dày đặc, cố gắng sống sót trước một mối đe dọa bất ngờ.',
    age_limit: 16,
    duration: 96,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Hành Động'
  },
  {
    film_name: 'Bé Ma Của Anh',
    release_date: 2024-07-18T17:00:00.000Z,
    film_describe: 'Bé Ma Của Anh xoay quanh Joe (Sutthirak Subvijitra), chàng streamer được thừa hưởng căn dinh thự cũ kĩ nằm ở vùng ngoại ô. Số phận thật trêu ngươi khi anh phát hiện đây còn là chỗ trú ngụ của 3 vong hồn mạnh mẽ, xưa giờ chưa từng ngán ngại tay thầy pháp 
nào. Tuy nhiên, bằng sự nhạy bén, chàng streamer đã đưa ra quyết định rất táo bạo: biến nơi này thành điểm vui chơi cảm giác mạnh thu hút giới trẻ Gen Z. Từ đấy, tin đồn về ngôi nhà ma ảo diệu ngày càng lan xa, tỉ lệ thuận với tình cảm giữa Joe và Anong (Maylada Susri), linh hồn nàng tiểu thư xinh đẹp nhưng phải chịu cái chết tức tưởi.',
    age_limit: 16,
    duration: 124,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Hài Kịch, Lãng Mạng'
  },
  {
    film_name: 'Vây Hãm Trên Không',
    release_date: 2024-07-18T17:00:00.000Z,
    film_describe: '"Từ giờ trở đi, chiếc máy bay này sẽ tới Triều Tiên!”. Bộ phim hành động ly kỳ dựa trên sự kiện có thật với sự tham gia của Ha Jung Woo, Yeo Jin Goo và Sung Dong Il được dựa trên một sự kiện có thật năm 1971, khi một thanh niên Hàn Quốc định cướp một chiếc máy bay chở khách khởi hành từ thành phố cảnh phía đông Sokcho bay tới Seoul. Mọi người trên chuyến bay này đều đang đặt cược mạng sống của mình!',
    age_limit: 16,
    duration: 100,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Hành Động, Tội Phạm'
  },
  {
    film_name: 'Deadpool 3: Deadpool & Wolverine',
    release_date: 2024-07-26T17:00:00.000Z,
    film_describe: 'Wolverine hợp sức với Deadpool để đánh bại kẻ thù chung.',
    age_limit: 18,
    duration: 128,
    film_type: 0,
    country: 0,
    categories: 'Hài Kịch, Hành Động, Khoa Học Viễn Tưởng'
  },
  {
    film_name: 'Phim Điện Ảnh Conan 27: Ngôi Sao 5 Cánh 1 Triệu Đô',
    release_date: 2024-08-01T17:00:00.000Z,
    film_describe: 'Trong khi đến Hakodate tham gia một giải kiếm đạo, Conan và Heiji đụng độ siêu trộm Kaito Kid - khi hắn đang nhắm tới một thanh kiếm Nhật được cất giấu trong nhà kho của một gia đình tài phiệt. Thi thể một tay buôn vũ khí khét tiếng được phát hiện với vết chém hình chữ thập, và trùng hợp thay, "kho báu" mà gã truy lùng dường như cũng có liên quan mật thiết đến thanh kiếm cổ mà Kid đang nhắm tới.',
    age_limit: 13,
    duration: 111,
    film_type: 0,
    country: 0,
    categories: 'Hành Động, Tội Phạm, Hoạt Hình, Bí Ẩn'
  },
  {
    film_name: 'Oan Hồn Báo Án',
    release_date: 2024-08-01T17:00:00.000Z,
    film_describe: 'Vina: Before 7 Days / Oan Hồn Báo Án xảy ra khi lời khai và chứng cứ bị bác bỏ khiến cho cái chết thảm khốc của Vina 
được kết luận do tai nạn. Oan hồn của cô trở về đòi lại công bằng qua thân xác người bạn thân Linda, kẻ thủ ác thật sự sẽ được pháp luật 
trừng trị hay nó sẽ rơi vào quên lãng khi cô siêu thoát sau 7 ngày kết thúc đám tang?',
    age_limit: 18,
    duration: 100,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Tội Phạm, Phiêu Lưu, Bí Ẩn, Drama'
  },
  {
    film_name: 'Ba Đêm Kinh Hoàng',
    release_date: 2024-08-01T17:00:00.000Z,
    film_describe: 'Bà mẹ đơn thân Ji Woo, anh thợ làm tóc Jae Yoon, hành khách bí ẩn Gyeong Rae… Ba con người, ba số phận với ba cuộc đời khác nhau vô tình vướng vào hàng loạt những sự kiện bí ẩn trong đêm đen. Cũng từ đây cuộc sống vốn có của cả ba bị đảo lộn và vượt khỏi tầm kiểm soát. Rốt cuộc thế lực nào đứng đằng sau và điều khiển cuộc chơi vẫn là câu hỏi bị bỏ ngỏ và chờ đợi khán giả khám phá.',      
    age_limit: 16,
    duration: 89,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Bí Ẩn'
  },
  {
    film_name: 'Mồ Tra Tấn',
    release_date: 2024-08-01T17:00:00.000Z,
    film_describe: 'Joko Anwar là đạo diễn đang hot rần rần trên Netflix với series kinh dị độc đáo, được ví như là một Guillermo del Toro hay Jordan Peele của Châu Á. Mồ Tra Tấn chuyển thể từ bộ phim kinh dị ngắn cùng tên của đạo diễn.',
    age_limit: 18,
    duration: 81,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Drama'
  },
  {
    film_name: 'Blackpink World Tour (Khởi Nguyên Hồng) In Cinemas',
    release_date: 2024-08-06T17:00:00.000Z,
    film_describe: 'BLACKPINK WORLD TOUR [KHỞI NGUYÊN HỒNG] in Cinemas là phiên bản chiếu rạp của tour diễn từng thiết lập hàng loạt kỷ lục, đưa BLACKPINK trở thành “Nhóm nhạc nữ có tour diễn sở hữu doanh thu cao nhất mọi thời đại”. Được ghi hình tại sân khấu biểu tượng “Hanok” thuộc trạm dừng Seoul - trạm dừng cuối cùng của tour diễn, BLACKPINK WORLD TOUR [KHỞI NGUYÊN HỒNG] in Cinemas đưa khán giả hòa mình 
vào bầu không khí cuồng nhiệt với những bản hit đình đám trong sự nghiệp của nhóm nhạc nữ biểu tượng Kpop thế hệ thứ 3.',
    age_limit: 13,
    duration: 92,
    film_type: 0,
    country: 0,
    categories: 'Âm Nhạc, Tiểu Sử'
  },
  {
    film_name: 'Vụ Bê Bối Ánh Trăng',
    release_date: 2024-08-08T17:00:00.000Z,
    film_describe: 'Fly Me To The Moon (Vụ Bê Bối Ánh Trăng) là dự án do Apple đồng sản xuất, lấy bối cảnh cuộc chạy đua vào vũ trụ những năm 1960. Bộ phim quy tụ dàn sao đình đình đám, nổi bật là Channing Tatum cùng Scarlett Johansson.',
    age_limit: 16,
    duration: 132,
    film_type: 0,
    country: 0,
    categories: 'Hài Kịch, Lãng Mạng'
  },
  {
    film_name: 'Tiếng Gọi Từ Địa Ngục',
    release_date: 2024-08-08T17:00:00.000Z,
    film_describe: 'Ebru, một nhà báo, bí mật trở thành bệnh nhân và tham gia điều tra vụ mất tích của các nữ chăm sóc viên tại một trung tâm sức khỏe tâm thần Trong quá trình phân tích một bức ảnh mà Ebru chia sẻ, Ebru và bạn của mình đã khám phá những bí ẩn lâu đời của trung tâm. Từ đây, cuộc hành trình đầy thử thách của họ bắt đầu.',
    age_limit: 16,
    duration: 92,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Bẫy',
    release_date: 2024-08-08T17:00:00.000Z,
    film_describe: 'Phim kinh dị của đạo diễn M. Night Shyamalan. Bộ phim theo chân người bố cùng cô con gái tuổi teen tham dự một buổi concert nhạc pop, nhưng rồi nhận ra họ đang mắc kẹt trong một âm mưu tăm tối và đáng sợ.',
    age_limit: 16,
    duration: 105,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị'
  },
  {
    film_name: 'Chạy Đua Với Tử Thần',
    release_date: 2024-08-08T17:00:00.000Z,
    film_describe: 'Nữ streamer nổi tiếng biến mất sau một sự kiện quảng cáo. Tỉnh dậy, cô phát hiện đang nằm trong chính cốp xe của mình. Mọi nỗ lực thoát ra đều vô ích nếu cô không đáp ứng yêu cầu từ tên bắt cóc. Một yêu cầu được đặt ra để cô không thể thực hiện. Liệu màn đấu trí căng não này sẽ đi về đâu?',
    age_limit: 16,
    duration: 90,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Hành Động'
  },
  {
    film_name: 'Ma Cây',
    release_date: 2024-08-08T17:00:00.000Z,
    film_describe: 'Sau cái chết bi thảm của cha mẹ, cậu thiếu niên Respati (Devano Danendra) đang cố gắng phục hồi tổn thương và tìm lại sự cân bằng trong cuộc sống. Tuy nhiên, việc phải chịu đựng những cơn ác mộng kinh hoàng mỗi đêm càng khiến tinh thần của Respati bị ảnh hưởng nghiêm trọng. Song, Respati nhận ra đó không đơn thuần là ác mộng, mà cậu đang sở hữu khả năng bước vào giấc mơ của người khác và 
giữ được ý thức trong mộng giới.',
    age_limit: 18,
    duration: 112,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Khoa Học Viễn Tưởng'
  },
  {
    film_name: 'Đẹp Trai Thấy Sai Sai',
    release_date: 2024-08-08T17:00:00.000Z,
    film_describe: 'Hai người đàn ông thô lỗ nhưng giản dị, tự xưng là Những anh chàng đẹp trai. Họ có ước mơ được sống ở vùng nông thôn 
và cuối cùng giấc mơ của họ đã thành hiện thực. Tuy nhiên, vào ngày đầu tiên chuyển đến ngôi nhà mới, một bí mật bị phong ấn dưới tầng hầm của họ đã được đánh thức. Từ đây gây ra một loạt những hài kịch khó đỡ.',
    age_limit: 18,
    duration: 101,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Hài Kịch'
  },
  {
    film_name: 'Blue Lock The Movie: Episode Nagi',
    release_date: 2024-08-13T17:00:00.000Z,
    film_describe: 'Đừng bỏ lỡ cơ hội duy nhất được chứng kiến “Khoảnh Khắc Thiên Tài Thức Tỉnh” trong Anime Bóng Đá Điên Rồ và Mãnh Liệt Nhất trên màn ảnh rộng nhé!',
    age_limit: 5,
    duration: 90,
    film_type: 0,
    country: 0,
    categories: 'Hành Động, Hoạt Hình, Drama'
  },
  {
    film_name: 'Quái Vật Không Gian: Romulus',
    release_date: 2024-08-15T17:00:00.000Z,
    film_describe: 'Phần phim mới nhất của thương hiệu phim quái vật gây ám ảnh nhất lịch sử điện ảnh theo chân một nhóm người khai hoang lục địa, đang tìm kiếm những gì còn sót lại trên một trạm vũ trụ bỏ hoang. Thế nhưng mọi chuyện trở thành một thảm kịch khi họ phải đối 
mặt với những thực thể quái vật ghê tởm nhất, và chuyến đi đầy hi vọng lại trở thành cơn ác mộng đối với tất cả mọi người.',
    age_limit: 18,
    duration: 118,
    film_type: 0,
    country: 0,
    categories: 'Kinh Dị, Khoa Học Viễn Tưởng'
  }
]`
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
const chatBot = async (req, res) => {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                
            ],
        });

        const prompt = req.body.message;

        const result = await chatSession.sendMessage(prompt);
        return res.json(result.response.text())
    } catch (error) {
        console.log(error)
        return res.json("Xin lỗi hệ thống có chút vấn đề mong bạn thông cảm")
    }

}

export default chatBot