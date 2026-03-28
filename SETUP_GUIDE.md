# دليل إعداد مشروع ATHAR

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من تثبيت البرامج التالية:
- Node.js (الإصدار 18 أو أحدث)
- MongoDB (للتطوير المحلي) أو حساب MongoDB Atlas
- محرر أكواد (VS Code موصى به)

## 🚀 خطوات الإعداد

### 1. إعداد قاعدة البيانات

#### الخيار أ: MongoDB المحلي (للتطوير)
1. قم بتثبيت MongoDB من موقعهم الرسمي
2. تأكد من أن MongoDB يعمل على جهازك
3. استخدم رابط الاتصال الافتراضي:
   ```
   MONGODB_URI=mongodb://localhost:27017/athar
   ```

#### الخيار ب: MongoDB Atlas (للإنتاج)
1. سجل حساب مجاني على [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. أنشئ Cluster جديد
3. أضف عنوان IP الخاص بك (أو استخدم 0.0.0.0 للسماح بالوصول من أي مكان)
4. أنشئ مستخدم قاعدة بيانات
5. احصل على رابط الاتصال (Connection String)
6. استبدل `<password>` بكلمة مرور المستخدم
7. مثال للرابط:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/athar
   ```

### 2. إعداد ملف .env

في مجلد `server`، ستجد ملف `.env`. قم بتعديل القيم التالية:

#### MONGODB_URI
```
MONGODB_URI=mongodb://localhost:27017/athar
```
- استخدم رابط MongoDB المحلي أو Atlas
- تأكد من أن قاعدة البيانات اسمها `athar`

#### JWT_SECRET
```
JWT_SECRET=your_secret_key_here
```
- استخدم سلسلة عشوائية طويلة ومعقدة
- يمكنك إنشاء واحدة باستخدام أي مولد كلمات مرور
- مثال: `xK9#mP2$vL5@nQ8&wR3!zY6*`

#### STRIPE_SECRET_KEY (اختياري)
```
STRIPE_SECRET_KEY=
```
- إذا أردت استخدام Stripe للمدفوعات:
  1. سجل في [Stripe](https://stripe.com)
  2. اذهب إلى Developers > API keys
  3. انسخ Secret key
  4. الصقه هنا
- إذا تركته فارغاً، سيتم استخدام محاكاة الدفع

#### EMAIL CONFIGURATION
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

للحصول على كلمة مرور التطبيق من Gmail:
1. اذهب إلى [Google Account Security](https://myaccount.google.com/security)
2. فعّل 2-Step Verification
3. ابحث عن "App Passwords"
4. أنشئ كلمة مرور جديدة
5. استخدم هذه الكلمة في EMAIL_PASS

#### CLIENT_URL
```
CLIENT_URL=http://localhost:5173
```
- للتطوير: استخدم `http://localhost:5173`
- للإنتاج: استخدم رابط موقعك الحقيقي

#### PORT
```
PORT=5000
```
- منفذ السيرفر (يمكنك تغييره إذا كان مشغولاً)

### 3. تثبيت المكتبات وتشغيل المشروع

#### تشغيل Backend:
```bash
cd server
npm install
npm run seed  # لإنشاء مستخدم الأدمن الافتراضي
npm run dev   # لتشغيل السيرفر في وضع التطوير
```

#### تشغيل Frontend:
```bash
cd client
npm install
npm run dev   # لتشغيل الواجهة الأمامية
```

### 4. تسجيل الدخول كأدمن

بعد تشغيل السيرفر وتنفيذ `seed`، يمكنك الدخول كأدمن باستخدام:
- البريد: `admin@athar.ai`
- كلمة المرور: `admin123`

## 📝 ملاحظات مهمة

1. **الأمان**: لا تشارك ملف `.env` أبداً
2. **Git**: ملف `.env` موجود في `.gitignore` ولن يتم رفعه
3. **الإنتاج**: استخدم قيم حقيقية وليست تجريبية عند النشر
4. **النسخ الاحتياطي**: احتفظ بنسخة من القيم في مكان آمن

## 🔧 استكشاف الأخطاء

### مشكلة: Cannot connect to MongoDB
**الحل**: تأكد من أن MongoDB يعمل أو أن رابط Atlas صحيح

### مشكلة: JWT_SECRET is not defined
**الحل**: تأكد من أن ملف `.env` موجود ويحتوي على JWT_SECRET

### مشكلة: Email sending failed
**الحل**: تحقق من EMAIL_USER و EMAIL_PASS، وتأكد من استخدام App Password وليس كلمة مرور الحساب

## 📞 الدعم

إذا واجهت أي مشاكل، تحقق من:
1. أن جميع المتغيرات في `.env` معبأة بشكل صحيح
2. أن جميع المكتبات مثبتة (`npm install`)
3. أن MongoDB يعمل بشكل صحيح
