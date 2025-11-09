// import React from 'react'
import { motion } from 'framer-motion';
import { Eye, Users, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FigmaDesign: React.FC = () => {
    const { t } = useLanguage();

    // Figma designs with translation keys
    const designs = [
        {
            id: 1,
            titleKey: 'figma.design1.title',
            descriptionKey: 'figma.design1.description',
            views: '1.2k',
            likes: '240',
            categoryKey: 'figma.category.ui',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/3b82f6?text=Dashboard+UI',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/dashboard-ui',
            featured: true,
            tagKeys: ['figma.tag.dashboard', 'figma.tag.web', 'figma.tag.modern']
        },
        {
            id: 2,
            titleKey: 'figma.design2.title',
            descriptionKey: 'figma.design2.description',
            views: '980',
            likes: '175',
            categoryKey: 'figma.category.mobile',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/8b5cf6?text=Mobile+App',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/mobile-app',
            featured: true,
            tagKeys: ['figma.tag.mobile', 'figma.tag.app', 'figma.tag.ios']
        },
        {
            id: 3,
            titleKey: 'figma.design3.title',
            descriptionKey: 'figma.design3.description',
            views: '2.3k',
            likes: '420',
            categoryKey: 'figma.category.ui',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/10b981?text=E-commerce+UI',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/ecommerce-ui',
            featured: false,
            tagKeys: ['figma.tag.ecommerce', 'figma.tag.web', 'figma.tag.shopping']
        },
        {
            id: 4,
            titleKey: 'figma.design4.title',
            descriptionKey: 'figma.design4.description',
            views: '1.7k',
            likes: '310',
            categoryKey: 'figma.category.branding',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/f59e0b?text=Brand+Identity',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/brand-identity',
            featured: false,
            tagKeys: ['figma.tag.branding', 'figma.tag.logo', 'figma.tag.identity']
        },
        {
            id: 5,
            titleKey: 'figma.design5.title',
            descriptionKey: 'figma.design5.description',
            views: '1.1k',
            likes: '190',
            categoryKey: 'figma.category.ui',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/ef4444?text=Portfolio+Design',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/portfolio-design',
            featured: false,
            tagKeys: ['figma.tag.portfolio', 'figma.tag.personal', 'figma.tag.web']
        },
        {
            id: 6,
            titleKey: 'figma.design6.title',
            descriptionKey: 'figma.design6.description',
            views: '2.5k',
            likes: '480',
            categoryKey: 'figma.category.mobile',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/a855f7?text=Fitness+App',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/fitness-app',
            featured: true,
            tagKeys: ['figma.tag.fitness', 'figma.tag.health', 'figma.tag.mobile']
        },
        {
            id: 7,
            titleKey: 'figma.design7.title',
            descriptionKey: 'figma.design7.description',
            views: '1.8k',
            likes: '320',
            categoryKey: 'figma.category.ui',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/ec4899?text=Social+Media+UI',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/social-media-ui',
            featured: false,
            tagKeys: ['figma.tag.social', 'figma.tag.media', 'figma.tag.web']
        },
        {
            id: 8,
            titleKey: 'figma.design8.title',
            descriptionKey: 'figma.design8.description',
            views: '2.1k',
            likes: '390',
            categoryKey: 'figma.category.branding',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/06b6d4?text=Logo+Collection',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/logo-collection',
            featured: true,
            tagKeys: ['figma.tag.logo', 'figma.tag.branding', 'figma.tag.identity']
        },
        {
            id: 9,
            titleKey: 'figma.design9.title',
            descriptionKey: 'figma.design9.description',
            views: '1.4k',
            likes: '260',
            categoryKey: 'figma.category.ui',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/8b5cf6?text=Blog+Redesign',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/blog-redesign',
            featured: false,
            tagKeys: ['figma.tag.blog', 'figma.tag.web', 'figma.tag.content']
        },
        {
            id: 10,
            titleKey: 'figma.design10.title',
            descriptionKey: 'figma.design10.description',
            views: '3.2k',
            likes: '580',
            categoryKey: 'figma.category.mobile',
            image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x250/1a1a1a/10b981?text=Travel+App',
            figmaUrl: 'https://www.figma.com/file/{figma-file-id}/travel-app',
            featured: true,
            tagKeys: ['figma.tag.travel', 'figma.tag.app', 'figma.tag.mobile']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const formatViews = (views: string) => {
        return `${views} ${t('figma.views')}`;
    };

    const formatLikes = (likes: string) => {
        return `${likes} ${t('figma.likes')}`;
    };

    return (
        <section id="designs" className='py-20 bg-dark-200/50'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >

                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        {t('figma.title')} <span className="gradient-text">{t('figma.titleHighlight')}</span>
                    </h2>
                    <div className="w-20 h-1 bg-white rounded-full mx-auto mb-8"></div>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {t('figma.subtitle')}
                    </p>

                </motion.div>

                {/* Figma Designs */}
                <>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >

                        {designs.map((design) => (
                            <motion.div
                                key={design.id}
                                variants={itemVariants}
                                className="group glass-effect rounded-xl overflow-hidden border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                                whileHover={{ y: -5 }}
                                onClick={() => window.open(design.figmaUrl, '_blank')}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={design.image}
                                        alt={t(design.titleKey)}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                                    {design.featured && (
                                        <div className="absolute top-4 left-4 px-2 py-1 bg-white text-gray-950 text-xs font-medium rounded">
                                            {t('figma.featured')}
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 text-white text-xs rounded">
                                        {t(design.categoryKey)}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                        <div className="flex bg-white px-2 py-1.5 text-black rounded-full items-center gap-1">
                                            <Eye size={12} />
                                            {formatViews(design.views)}
                                        </div>
                                        <div className="flex bg-white px-2 py-1.5 text-black rounded-full items-center gap-1">
                                            <Users size={12} />
                                            {formatLikes(design.likes)}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-primary transition-colors line-clamp-2">
                                        {t(design.titleKey)}
                                    </h3>
                                    <p className="text-gray-100 text-sm mb-4 line-clamp-3">
                                        {t(design.descriptionKey)}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {design.tagKeys.map((tagKey, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full border border-accent-primary/30"
                                            >
                                                {t(tagKey)}
                                            </span>
                                        ))}
                                    </div>

                                    <motion.div
                                        className="flex justify-center w-full text-black font-medium text-sm transition-all duration-200"
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="rounded-full bg-white px-4 py-2 text-sm font-medium w-full text-center">
                                            {t('figma.viewDesign')}
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-12"
                    >

                        <motion.a
                            href="https://www.figma.com/@{username}"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white font-medium rounded-lg transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github size={20} />
                            {t('figma.viewProfile')}
                        </motion.a>

                    </motion.div>
                </>
            </div>
        </section>
    );
}

export default FigmaDesign;
