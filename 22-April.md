---


---

<h1 id="summary-22-april-2021">Summary 22-April-2021</h1>
<h2 id="update-database">Update database:</h2>
<ul>
<li>Teaching hours trong bảng Contract đổi type thành double</li>
<li>Thay đổi isClose thành state: State att bao gồm các state như sau:
<ul>
<li>waiting: chưa được tutor accept</li>
<li>open: đã được tutor accept</li>
<li>rejected: đã bị tutor reject</li>
<li>close: hoàn tất contract</li>
</ul>
</li>
<li>Thêm 1 bảng UnverifiedTutor</li>
<li>Thêm email vào bảng tutor, unverifiedTutor, tutee</li>
</ul>
<h2 id="register-and-login-in-controller">Register and login in controller:</h2>
<h3 id="register">Register:</h3>
<h4 id="tutor">Tutor:</h4>
<ul>
<li>Khi tutor register, mình cần 1 hệ thống để admin có thể tự verify profile của tutor là thật, eg: GPA đúng như Tutor ghi trong registration form, dù ko cần biết admin verify ntn. Trước đó thì mình sẽ có checkChosenTutorUsername, check ChosenEmail, verify Email.</li>
<li>Flow:
<ul>
<li>Tutor register -&gt; add thông tin vào bảng unverifiedTutor</li>
<li>Ở màn hình của admin, mình sẽ lấy tất cả các tutor chưa được verify ra và hiển thị lên</li>
<li>Admin sẽ chọn và verify:
<ul>
<li>nếu verify thành công:
<ul>
<li>update password bằng hash password</li>
<li>add tutor vào bảng tutor, xóa tutor trong bảng unverifiedTutor</li>
<li>add TeachingCourse cho tutor</li>
<li>add moneyAccount</li>
</ul>
</li>
<li>nếu verify thất bại: xóa trong bảng unverified nhưng ko add vào bảng tutor</li>
</ul>
</li>
</ul>
</li>
<li>Functions for registration, tutor:<br>
<code>- checkChosenTutorUsername</code><br>
<code>- checkChosenEmail</code><br>
<code>- email verification code (optional)</code><br>
<code>- saveUnverified(tutor)</code></li>
<li>Function for Admin verification: như phần trên</li>
</ul>
<h4 id="tutee">Tutee:</h4>
<p>Tutee không cần phải verify những thông tin như GPA, nhưng vẫn cần xem username và email đã đc đk chưa,<br>
Khi tutee registers, mình sẽ add tutee vào bảng tutee, add moneyAccount directly</p>
<h3 id="log-in-in-controller-only">Log in (in controller only):</h3>
<ul>
<li>Check username và password
<ul>
<li>nếu sai: return error và redirect login page</li>
<li>nếu đúng:
<ul>
<li>generate token: <a href="https://jwt.io/">https://jwt.io/</a></li>
<li>store token in cache: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Cache">https://developer.mozilla.org/en-US/docs/Web/API/Cache</a></li>
<li>hoặc store token in cookies: <a href="https://blog.ropnop.com/storing-tokens-in-browser/">https://blog.ropnop.com/storing-tokens-in-browser/</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<p>Yêu cầu ngoài hàm login của controller: chỉ khi log in mới được vào những chức năng khác của web, không thì sẽ bị redirect log in page. Log in được check bằng cách mỗi lần client load 1, client sẽ request yêu cầu verify từ server, server dựa theo token trong cookies để cho biết thông tin của client, nếu invalid token(có token nhưng token đã hết hiệu lực, cái này optional) hoặc ko có token trả về, tức là client chưa login.</p>
<h3 id="log-out-if-have-time">Log out (if have time):</h3>
<ul>
<li>erase token in sessionStorage/cacheStorage</li>
</ul>

