# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring bilingual support (Thai/English) and smooth animations.

## 🌟 Features

- **Bilingual Support**: Switch between Thai and English languages
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Modern UI**: Built with Tailwind CSS for a clean, professional look
- **Sections**:
  - About: Professional introduction and background
  - Experience: Work history and achievements
  - Skills: Technical skills and specializations
  - Education: Academic background
  - Portfolio: Showcase of selected projects
  - Gallery: Visual portfolio
  - Contact: Contact information and social links

## 🚀 Tech Stack

- **Framework**: Next.js 14.2.5
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.4
- **Animations**: Framer Motion 11.3.17
- **Language**: TypeScript 5.6.2

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/praewfah/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Run the development server:
```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `yarn dev` / `npm run dev` - Start development server
- `yarn build` / `npm run build` - Build for production
- `yarn start` / `npm start` - Start production server (requires build first)

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets (images, etc.)
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── Nav.tsx
│   │   ├── PortfolioSection.tsx
│   │   └── SkillsSection.tsx
│   ├── contexts/       # React contexts
│   │   └── LanguageContext.tsx
│   └── lib/           # Utilities
│       └── translations.ts
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── server.js
└── tailwind.config.ts
```

## 🌐 Language Support

The portfolio supports two languages:
- **Thai (ไทย)**: Default language
- **English (EN)**: Secondary language

Language switching is available in the navigation bar. All content is managed through the `translations.ts` file.

## 🎨 Customization

### Adding New Content

1. **Translations**: Edit `src/lib/translations.ts` to add or modify content in both languages.

2. **Sections**: Add new sections by:
   - Creating a new component in `src/components/`
   - Adding it to `src/app/page.tsx`
   - Adding navigation item in `src/components/Nav.tsx`
   - Adding translations in `src/lib/translations.ts`

### Styling

The project uses Tailwind CSS. Customize styles by:
- Modifying `tailwind.config.ts` for theme customization
- Editing component classes directly
- Updating `src/app/globals.css` for global styles

## 📝 License

This project is private and proprietary.

## 👤 Author

**Aumaporn T.**
- GitHub: [@praewfah](https://github.com/praewfah)
- Email: praew.auma@gmail.com

---

# เว็บไซต์ Portfolio

เว็บไซต์ Portfolio ที่ทันสมัยและรองรับการแสดงผลบนอุปกรณ์ต่างๆ สร้างด้วย Next.js พร้อมรองรับสองภาษา (ไทย/อังกฤษ) และแอนิเมชันที่นุ่มนวล

## 🌟 คุณสมบัติ

- **รองรับสองภาษา**: สลับระหว่างภาษาไทยและอังกฤษได้
- **ดีไซน์ Responsive**: ปรับให้เหมาะกับเดสก์ท็อป แท็บเล็ต และมือถือ
- **แอนิเมชันนุ่มนวล**: ใช้ Framer Motion เพื่อประสบการณ์ผู้ใช้ที่น่าสนใจ
- **UI ทันสมัย**: สร้างด้วย Tailwind CSS สำหรับรูปลักษณ์ที่สะอาดและเป็นมืออาชีพ
- **ส่วนต่างๆ**:
  - เกี่ยวกับ: แนะนำตัวและประวัติการทำงาน
  - ประสบการณ์: ประวัติการทำงานและผลงาน
  - ทักษะ: ทักษะทางเทคนิคและความเชี่ยวชาญพิเศษ
  - การศึกษา: ประวัติการศึกษา
  - Portfolio: แสดงผลงานที่เลือกมา
  - แกลเลอรี่: Portfolio แบบภาพ
  - ติดต่อ: ข้อมูลติดต่อและลิงก์โซเชียล

## 🚀 เทคโนโลยีที่ใช้

- **Framework**: Next.js 14.2.5
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.4
- **Animations**: Framer Motion 11.3.17
- **Language**: TypeScript 5.6.2

## 📦 การติดตั้ง

1. Clone repository:
```bash
git clone https://github.com/praewfah/portfolio.git
cd portfolio
```

2. ติดตั้ง dependencies:
```bash
yarn install
# หรือ
npm install
```

3. รัน development server:
```bash
yarn dev
# หรือ
npm run dev
```

4. เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## 🛠️ คำสั่งที่ใช้ได้

- `yarn dev` / `npm run dev` - เริ่ม development server
- `yarn build` / `npm run build` - Build สำหรับ production
- `yarn start` / `npm start` - เริ่ม production server (ต้อง build ก่อน)

## 📁 โครงสร้างโปรเจกต์

```
portfolio/
├── public/              # ไฟล์ static (รูปภาพ ฯลฯ)
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── globals.css # สไตล์ global
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # หน้าแรก
│   ├── components/     # React components
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── Nav.tsx
│   │   ├── PortfolioSection.tsx
│   │   └── SkillsSection.tsx
│   ├── contexts/       # React contexts
│   │   └── LanguageContext.tsx
│   └── lib/           # Utilities
│       └── translations.ts
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── server.js
└── tailwind.config.ts
```

## 🌐 รองรับภาษา

Portfolio รองรับสองภาษา:
- **ไทย**: ภาษาเริ่มต้น
- **English (EN)**: ภาษาที่สอง

การสลับภาษาสามารถทำได้ที่แถบนำทาง เนื้อหาทั้งหมดจัดการผ่านไฟล์ `translations.ts`

## 🎨 การปรับแต่ง

### เพิ่มเนื้อหาใหม่

1. **Translations**: แก้ไข `src/lib/translations.ts` เพื่อเพิ่มหรือแก้ไขเนื้อหาในทั้งสองภาษา

2. **Sections**: เพิ่มส่วนใหม่โดย:
   - สร้าง component ใหม่ใน `src/components/`
   - เพิ่มใน `src/app/page.tsx`
   - เพิ่มรายการนำทางใน `src/components/Nav.tsx`
   - เพิ่ม translations ใน `src/lib/translations.ts`

### การจัดสไตล์

โปรเจกต์ใช้ Tailwind CSS ปรับแต่งสไตล์โดย:
- แก้ไข `tailwind.config.ts` สำหรับการปรับแต่งธีม
- แก้ไข classes ของ component โดยตรง
- อัปเดต `src/app/globals.css` สำหรับสไตล์ global

## 📝 License

โปรเจกต์นี้เป็น private และเป็นกรรมสิทธิ์

## 👤 ผู้สร้าง

**Aumaporn T.**
- GitHub: [@praewfah](https://github.com/praewfah)
- Email: praew.auma@gmail.com
