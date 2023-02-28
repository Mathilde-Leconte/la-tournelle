<?php

namespace App\Form;

use App\Entity\Film;
use Symfony\Component\Form\AbstractType;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class Film1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre', TextType::class, ["label" => "Titre", "required" => true])
            ->add('realisation', TextType::class, ["label" => "Réalisation", "required" => true])
            ->add('casting', TextType::class, ["label" => "Casting", "required" => false])
            ->add('pays', TextType::class, ["label" => "Pays", "required" => true])
            ->add('duree', IntegerType::class, [
                "label" => "Durée en minute",
                "required" => true
            ])
            ->add('synopsis', CKEditorType::class)
            ->add('recompense', TextType::class, ["label" => "Récompense", "required" => false])
            ->add('distributeur', TextType::class, ["label" => "Distributeur", "required" => true])
            ->add('coutLocation',  TextType::class, ["label" => "Location", "required" => false])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Film::class,
        ]);
    }
}
