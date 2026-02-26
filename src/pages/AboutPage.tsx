import { Heart, Users, Award, Zap } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About HealthVista</h1>
          <p className="text-xl text-gray-600">Your trusted source for evidence-based health information</p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-8">
            HealthVista is dedicated to empowering individuals with accurate, evidence-based health information. We believe that access to quality health education is fundamental to improving personal wellness and preventing disease. Our mission is to make complex health topics accessible and understandable for everyone.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
          <p className="text-gray-700 mb-8">
            We publish comprehensive articles covering nutrition, fitness, mental health, disease prevention, medical news, and lifestyle wellness. Each article is carefully researched and reviewed to ensure accuracy and relevance. Our team of health professionals and writers work together to deliver content that is both educational and actionable.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-emerald-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">Accuracy</h3>
              </div>
              <p className="text-gray-700">We prioritize evidence-based information backed by scientific research and medical expertise.</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
              </div>
              <p className="text-gray-700">We make health information understandable and accessible to everyone, regardless of background.</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quality</h3>
              </div>
              <p className="text-gray-700">We maintain high standards in research, writing, and editorial review for all content.</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">Action</h3>
              </div>
              <p className="text-gray-700">We empower readers with practical tips and actionable advice for improving their health.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">Our Content</h2>
          <p className="text-gray-700 mb-4">
            HealthVista covers six main categories of health information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
            <li><strong>Nutrition:</strong> Evidence-based nutrition and diet guides</li>
            <li><strong>Fitness:</strong> Exercise routines and fitness tips</li>
            <li><strong>Mental Health:</strong> Mental wellbeing and stress management</li>
            <li><strong>Disease Prevention:</strong> Tips to prevent common diseases</li>
            <li><strong>Lifestyle:</strong> Healthy lifestyle habits</li>
            <li><strong>Medical News:</strong> Latest healthcare breakthroughs</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h2>
          <p className="text-gray-700">
            The information provided on HealthVista is for educational purposes only and should not be considered medical advice. Always consult with a qualified healthcare professional before making any changes to your diet, exercise routine, or medical treatment. HealthVista is not responsible for any adverse effects or consequences resulting from the use of information provided on this website.
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Have Questions?</h2>
          <p className="mb-4">Get in touch with our team for inquiries, suggestions, or partnerships</p>
          <a href="mailto:info@healthvista.com" className="inline-block bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
